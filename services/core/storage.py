"""
Storage abstraction layer for OpenLens Core service.
Serves as the single source of truth for DynamoDB connections and table management.
"""
import boto3
from botocore.exceptions import ClientError
from config import settings


def get_dynamodb_resource():
    """Returns a configured Boto3 DynamoDB resource."""
    return boto3.resource(
        "dynamodb",
        endpoint_url=settings.dynamodb_endpoint,
        region_name=settings.aws_region,
        aws_access_key_id=settings.aws_access_key_id,
        aws_secret_access_key=settings.aws_secret_access_key,
    )


dynamodb = get_dynamodb_resource()


def create_users_table(dynamodb_resource=None):
    """
    Creates the 'OpenLensUsers' table if it doesn't already exist.
    - Partition Key: userId (String)
    - GSI: email-index on 'email' (String) with ALL projection for fast auth queries
    """
    if dynamodb_resource is None:
        dynamodb_resource = dynamodb

    table_name = settings.dynamodb_users_table
    table = dynamodb_resource.Table(table_name)

    try:
        table.load()
        print(f"[-] Table '{table_name}' already exists.")
        return table
    except ClientError as e:
        if e.response["Error"]["Code"] == "ResourceNotFoundException":
            print(f"[+] Creating '{table_name}' table...")
            try:
                table = dynamodb_resource.create_table(
                    TableName=table_name,
                    KeySchema=[
                        {"AttributeName": "userId", "KeyType": "HASH"},
                    ],
                    AttributeDefinitions=[
                        {"AttributeName": "userId", "AttributeType": "S"},
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
            except ClientError as ce:
                if ce.response["Error"]["Code"] == "ResourceInUseException":
                    print(f"[-] Table '{table_name}' was already created concurrently.")
                    return table
                raise
        else:
            raise


def init_db():
    """Initializes persistent tables for OpenLens Core service."""
    create_users_table(dynamodb)
