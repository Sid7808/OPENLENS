import os
import boto3
from botocore.exceptions import ClientError

# Configuration - reads from environment or uses local defaults
DYNAMODB_ENDPOINT = os.getenv("DYNAMODB_ENDPOINT", "http://localhost:8000")
AWS_REGION = os.getenv("AWS_REGION", "local")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID", "dummy")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY", "dummy")

def get_dynamodb_resource():
    return boto3.resource(
        "dynamodb",
        endpoint_url=DYNAMODB_ENDPOINT,
        region_name=AWS_REGION,
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    )

def create_users_table(dynamodb):
    """
    Creates the 'Users' table:
    - Partition Key: id (String)
    - GSI: email-index on 'email' (String) for fast login/auth queries
    """
    table_name = "Users"
    existing_tables = [t.name for t in dynamodb.tables.all()]

    if table_name in existing_tables:
        print(f"[-] Table '{table_name}' already exists.")
        return dynamodb.Table(table_name)

    print(f"[+] Creating '{table_name}' table...")
    table = dynamodb.create_table(
        TableName=table_name,
        KeySchema=[
            {"AttributeName": "id", "KeyType": "HASH"},  # Partition Key
        ],
        AttributeDefinitions=[
            {"AttributeName": "id", "AttributeType": "S"},
            {"AttributeName": "email", "AttributeType": "S"},
        ],
        GlobalSecondaryIndexes=[
            {
                "IndexName": "email-index",
                "KeySchema": [
                    {"AttributeName": "email", "KeyType": "HASH"}
                ],
                "Projection": {"ProjectionType": "ALL"},
            }
        ],
        BillingMode="PAY_PER_REQUEST",
    )
    table.wait_until_exists()
    print(f"[✓] Table '{table_name}' created successfully!")
    return table

def create_datasets_table(dynamodb):
    """
    Creates the 'Datasets' table:
    - Partition Key: id (String)
    """
    table_name = "Datasets"
    existing_tables = [t.name for t in dynamodb.tables.all()]

    if table_name in existing_tables:
        print(f"[-] Table '{table_name}' already exists.")
        return dynamodb.Table(table_name)

    print(f"[+] Creating '{table_name}' table...")
    table = dynamodb.create_table(
        TableName=table_name,
        KeySchema=[
            {"AttributeName": "id", "KeyType": "HASH"},  # Partition Key
        ],
        AttributeDefinitions=[
            {"AttributeName": "id", "AttributeType": "S"},
        ],
        BillingMode="PAY_PER_REQUEST",
    )
    table.wait_until_exists()
    print(f"[✓] Table '{table_name}' created successfully!")
    return table

def main():
    print(f"Connecting to DynamoDB at {DYNAMODB_ENDPOINT}...")
    try:
        dynamodb = get_dynamodb_resource()
        create_users_table(dynamodb)
        create_datasets_table(dynamodb)
        print("\nAll tables initialized successfully!")
    except Exception as e:
        print(f"\n[!] Error initializing tables: {e}")

if __name__ == "__main__":
    main()
