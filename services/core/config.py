from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    host: str = "0.0.0.0"
    port: int = 8080
    environment: str = "development"


    #Auth Security Configurations
    jwt_secret:str = "your-secret-key-change-in-prod"
    jwt_algorithm: str ="HS256"
    access_token_expire_minutes: int = 60

    #CORS Configuration

    allowed_origins: List[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()