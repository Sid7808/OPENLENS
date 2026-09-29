from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    host: str = "0.0.0.0"
    port: int = 8080
    environment: str = "development"

    # PostgreSQL Database Settings
    postgres_host: str = "localhost"
    postgres_port: int = 5432
    postgres_user: str = "openlens"
    postgres_password: str = "openlens_secret"
    postgres_db: str = "openlens_core"
    database_url: Optional[str] = None

    # Connection pool settings
    db_pool_size: int = 10
    db_max_overflow: int = 20
    db_pool_timeout: int = 30

    # JWT settings (at least 32 characters to comply with RFC 7518 HS256 key length)
    jwt_secret_key: str = "openlens-development-secret-key-at-least-32-bytes-long"
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 30

    @property
    def async_database_url(self) -> str:
        """Returns the async connection string for PostgreSQL."""
        if self.database_url:
            url = self.database_url
            if url.startswith("postgres://"):
                url = url.replace("postgres://", "postgresql+asyncpg://", 1)
            elif url.startswith("postgresql://") and not url.startswith("postgresql+asyncpg://"):
                url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
            return url
        return (
            f"postgresql+asyncpg://{self.postgres_user}:{self.postgres_password}@"
            f"{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()