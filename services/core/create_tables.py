"""
CLI utility script to initialize/verify PostgreSQL database connection for OpenLens.
Reuses the single source of truth defined in storage.py.
"""
import asyncio
from config import settings
from storage import init_db


def main():
    print(f"Connecting to PostgreSQL at {settings.postgres_host}:{settings.postgres_port}/{settings.postgres_db}...")
    try:
        asyncio.run(init_db())
        print(f"\n[OK] PostgreSQL connection verified for database '{settings.postgres_db}'.")
    except Exception as e:
        print(f"\n[!] Error connecting to PostgreSQL: {e}")
        raise


if __name__ == "__main__":
    main()
