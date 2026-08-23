import uvicorn
from fastapi import FastAPI
from config import settings

app = FastAPI(
    title="OpenLens Studio Service",
    description="Analysis backend for OpenLens",
    version="1.0.0"
)

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "studio"
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=True if settings.environment == "development" else False
    )
