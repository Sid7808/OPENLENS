"""
Storage abstraction layer for OpenLens Core service.
Serves as the single source of truth for PostgreSQL database connections,
session lifecycle management, connection health checks, and engine pooling.
"""
import asyncio
from typing import Any, AsyncGenerator, Dict, Optional
from sqlalchemy import text
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from config import settings


def create_engine_instance(url: Optional[str] = None) -> AsyncEngine:
    """Creates a configured async engine for PostgreSQL with connection pooling."""
    db_url = url or settings.async_database_url

    connect_args: Dict[str, Any] = {}
    engine_kwargs: Dict[str, Any] = {
        "echo": False,
        "future": True,
    }

    if "sqlite" in db_url:
        connect_args["check_same_thread"] = False
        engine_kwargs["connect_args"] = connect_args
    else:
        # Disable SSL for local development with asyncpg
        connect_args["ssl"] = False
        engine_kwargs["connect_args"] = connect_args
        engine_kwargs["pool_size"] = settings.db_pool_size
        engine_kwargs["max_overflow"] = settings.db_max_overflow
        engine_kwargs["pool_timeout"] = settings.db_pool_timeout
        engine_kwargs["pool_pre_ping"] = True

    return create_async_engine(db_url, **engine_kwargs)


# Global default engine and sessionmaker
engine: AsyncEngine = create_engine_instance()
async_session_factory: async_sessionmaker[AsyncSession] = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """
    FastAPI dependency yielding an async database session per request.
    Automatically rolls back on uncaught exception and closes session.
    """
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise


async def check_connection(target_engine: Optional[AsyncEngine] = None, max_retries: int = 3) -> Dict[str, Any]:
    """
    Performs a live connection health check against PostgreSQL with retry support.
    Returns status dictionary with database version and latency info.
    """
    eng = target_engine or engine
    last_err = None

    for attempt in range(max_retries):
        try:
            async with eng.connect() as conn:
                result = await conn.execute(text("SELECT version()"))
                version_str = result.scalar_one_or_none()
                return {
                    "status": "connected",
                    "database": settings.postgres_db,
                    "host": settings.postgres_host,
                    "port": settings.postgres_port,
                    "server_version": version_str,
                }
        except Exception as e:
            last_err = e
            if attempt < max_retries - 1:
                await asyncio.sleep(0.5)

    raise last_err or RuntimeError("Failed to connect to database.")


async def init_db(engine_override: Optional[AsyncEngine] = None, max_retries: int = 3) -> None:
    """Initializes and verifies the database connection with retry support."""
    eng = engine_override or engine
    last_err = None

    for attempt in range(max_retries):
        try:
            async with eng.connect() as conn:
                await conn.execute(text("SELECT 1"))
            return
        except Exception as e:
            last_err = e
            if attempt < max_retries - 1:
                await asyncio.sleep(0.5)

    raise last_err or RuntimeError("Failed to initialize database.")


async def close_db(engine_override: Optional[AsyncEngine] = None) -> None:
    """Closes all database engine connections and disposes pool."""
    eng = engine_override or engine
    await eng.dispose()
