from contextlib import asynccontextmanager
import uvicorn
from fastapi import FastAPI
from config import settings
from storage import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(
    title="OpenLens Core Service",
    description="Main API boundary and gateway for OpenLens",
    version="1.0.0",
    lifespan=lifespan,
)

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "core",
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=True if settings.environment == "development" else False,
    )

