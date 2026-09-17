"""
Storage abstraction layer for OpenLens Core service.
"""
import boto3
from config import settings

def get_dynamodb_resource():
    return boto3.resource(
        "dynamodb",
        endpoint_url=settings.dynamodb_endpoint,
        region_name=settings.aws_region,
        aws_access_key_id=settings.aws_access_key_id,
        aws_secret_access_key=settings.aws_secret_access_key,
    )

dynamodb = get_dynamodb_resource()

def init_db():
    """Initializes tables on service boot if they don't exist."""
    existing_tables = [t.name for t in dynamodb.tables.all()]

    # 1. Users Table
    if "Users" not in existing_tables:
        users_table = dynamodb.create_table(
            TableName="Users",
            KeySchema=[{"AttributeName": "id", "KeyType": "HASH"}],
            AttributeDefinitions=[
                {"AttributeName": "id", "AttributeType": "S"},
                {"AttributeName": "email", "AttributeType": "S"},
            ],
            GlobalSecondaryIndexes=[
                {
                    "IndexName": "email-index",
                    "KeySchema": [{"AttributeName": "email", "KeyType": "HASH"}],
                    "Projection": {"ProjectionType": "ALL"},
                }
            ],
            BillingMode="PAY_PER_REQUEST",
        )
        users_table.wait_until_exists()

    # 2. Datasets Table
    if "Datasets" not in existing_tables:
        datasets_table = dynamodb.create_table(
            TableName="Datasets",
            KeySchema=[{"AttributeName": "id", "KeyType": "HASH"}],
            AttributeDefinitions=[{"AttributeName": "id", "AttributeType": "S"}],
            BillingMode="PAY_PER_REQUEST",
        )
        datasets_table.wait_until_exists()
