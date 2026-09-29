"""
Verification script for PostgreSQL connection & FastAPI health checks in OpenLens Core.
Tests:
1. Configuration loading & async_database_url formation.
2. Direct connection health check via storage.check_connection().
3. FastAPI /health and /health/db endpoints via httpx AsyncClient.
"""
import asyncio
from httpx import AsyncClient, ASGITransport
from config import settings
from storage import check_connection, close_db
from main import app


async def run_verification():
    print("=== OpenLens PostgreSQL Connection & Health Check Verification ===")

    # 1. Verify Configuration
    print(f"\n[1] Verifying Database Configuration...")
    print(f"    - Host: {settings.postgres_host}")
    print(f"    - Port: {settings.postgres_port}")
    print(f"    - User: {settings.postgres_user}")
    print(f"    - Database: {settings.postgres_db}")
    print(f"    - Connection URL: {settings.async_database_url}")
    assert settings.postgres_db == "openlens_core", "Expected database name 'openlens_core'"
    assert "postgresql+asyncpg://" in settings.async_database_url, "Expected asyncpg driver in URL"
    print("    [PASS] Database configuration verified.")

    # 2. Test Direct Connection Check
    print(f"\n[2] Testing Direct Database Connection...")
    db_status = await check_connection()
    assert db_status.get("status") == "connected", f"Expected 'connected', got {db_status}"
    assert db_status.get("database") == "openlens_core", "Database name mismatch"
    assert db_status.get("server_version") is not None, "Server version must be returned"
    print(f"    - Server Version: {db_status['server_version'].strip()[:65]}...")
    print("    [PASS] Direct database connection check verified.")

    # 3. Test FastAPI Endpoints
    print(f"\n[3] Testing FastAPI HTTP Health Check Endpoints...")
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # Test /health
        res_health = await client.get("/health")
        assert res_health.status_code == 200, f"Expected 200, got {res_health.status_code}"
        data_health = res_health.json()
        assert data_health.get("status") == "healthy", f"Expected healthy, got {data_health}"
        assert data_health.get("database", {}).get("status") == "connected", "DB status must be connected"
        print(f"    - GET /health response: {data_health}")
        print("    [PASS] /health endpoint verified (status: healthy, db: connected).")

        # Test /health/db
        res_db = await client.get("/health/db")
        assert res_db.status_code == 200, f"Expected 200, got {res_db.status_code}"
        data_db = res_db.json()
        assert data_db.get("status") == "connected", f"Expected connected, got {data_db}"
        print(f"    - GET /health/db response: {data_db}")
        print("    [PASS] /health/db endpoint verified.")

    # 4. Teardown
    await close_db()
    print("\n[ALL CHECKS PASSED] FastAPI successfully connected to PostgreSQL!")


if __name__ == "__main__":
    asyncio.run(run_verification())
