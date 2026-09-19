"""
CLI utility script to initialize DynamoDB tables for OpenLens.
Reuses the single source of truth defined in storage.py.
"""
from config import settings
from storage import init_db


def main():
    print(f"Connecting to DynamoDB at {settings.dynamodb_endpoint} (region: {settings.aws_region})...")
    try:
        init_db()
        print(f"\n[✓] DynamoDB initialization completed for table '{settings.dynamodb_users_table}'.")
    except Exception as e:
        print(f"\n[!] Error initializing DynamoDB tables: {e}")
        raise


if __name__ == "__main__":
    main()
