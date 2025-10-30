import supabase
from supabase import create_client
from consts import table_name
from dto import AQIDataDTO
from typing import Any

class SupabaseService:
    def __init__(self, url: str, key: str):
        self.client = supabase.create_client(url, key)

    def insert_aqi_pred_data(self, table: str, data: AQIDataDTO):
        response = self.client.table(table_name).insert(data.model_dump_json()).execute()
        return response
    
    def fetch_aqi_data(self, table: str) -> list[Any]:
        response = self.client.table(table_name).select("*").execute()
        return response.data