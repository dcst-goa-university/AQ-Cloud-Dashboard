import dotenv
import os 
import polars

from data.service import SupabaseService
from inference.service import InferenceService

dotenv.load_dotenv()

SupabaseInstance = SupabaseService(os.getenv("SUPABASE_URL",""), os.getenv("SUPABASE_KEY",""))
InferenceInstance = InferenceService()

train_data_raw = SupabaseInstance.fetch_aqi_data(os.getenv("AQI_TABLE",""))
train = polars.DataFrame(train_data_raw).select(["ds", "y"]).to_pandas()
InferenceInstance.train_model(train)

forecast = InferenceInstance.predict(24)
