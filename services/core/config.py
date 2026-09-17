from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    host: str = "0.0.0.0"
    port: int = 8080
    environment: str = "development"

# Dynamodb settings

    dynamodb_endpoint: str = "http://localhost:8000"
    aws_region: str = "local"
    aws_access_key_id: str = "dummy"
    aws_secret_access_key: str = "dummy"


    class Config:
        env_file = ".env"
        extra = "ignore"
        
settings = Settings()