from contextlib import asynccontextmanager
import uvicorn
from fastapi import FastAPI, Response, status
from config import settings
from storage import init_db, close_db, check_connection


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Verify database connection on startup
    try:
        await init_db()
        print(f"[OK] Connected to PostgreSQL at {settings.postgres_host}:{settings.postgres_port}/{settings.postgres_db}")
    except Exception as e:
        print(f"[WARNING] Database connection not ready on startup: {e}")
    yield
    # Dispose connection pools on shutdown
    await close_db()


app = FastAPI(
    title="OpenLens Core Service",
    description="Main API boundary, gateway, and database coordinator for OpenLens",
    version="1.0.0",
    lifespan=lifespan,
)


@app.get("/health")
async def health_check(response: Response):
    """General health check reporting service status and PostgreSQL connectivity."""
    db_health = {}
    db_ok = False
    try:
        db_health = await check_connection()
        db_ok = True
    except Exception as e:
        db_health = {
            "status": "disconnected",
            "error": str(e),
        }
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE

    return {
        "status": "healthy" if db_ok else "degraded",
        "service": "core",
        "database": db_health,
    }


@app.get("/health/db")
async def database_health(response: Response):
    """Dedicated database connection health check."""
    try:
        return await check_connection()
    except Exception as e:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
        return {
            "status": "error",
            "database": settings.postgres_db,
            "error": str(e),
        }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=True if settings.environment == "development" else False,
    )
