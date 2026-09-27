from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    host: str = "0.0.0.0"
    port: int = 8080
    environment: str = "development"

    # JWT settings (at least 32 characters to comply with RFC 7518 HS256 key length)
    jwt_secret_key: str = "openlens-development-secret-key-at-least-32-bytes-long"
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 30

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()