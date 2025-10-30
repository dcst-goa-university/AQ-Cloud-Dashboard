from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from DataAPI.aqi_model import get_aqi_forecast

app = FastAPI(title="AQI Prediction API", version="1.0")

# Allow frontend dashboard requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict later to your dashboard domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Welcome to the AQI Prediction API"}


@app.get("/api/aqi")
def get_aqi():
    """Fetch current and predicted AQI for user's location"""
    try:
        result = get_aqi_forecast()
        return result
    except Exception as e:
        return {"error": str(e)}
