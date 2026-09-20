from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    host: str = "0.0.0.0"
    port: int = 8080
    environment: str = "development"

    # DynamoDB settings
    dynamodb_endpoint: str = "http://localhost:8000"
    aws_region: str = "local"
    aws_access_key_id: str = "dummy"
    aws_secret_access_key: str = "dummy"
    dynamodb_users_table: str = "OpenLensUsers"

    # JWT settings (at least 32 characters to comply with RFC 7518 HS256 key length)

    jwt_secret_key: str = "openlens-development-secret-key-at-least-32-bytes-long"
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 30


    class Config:
        env_file = ".env"
        extra = "ignore"
        
settings = Settings()