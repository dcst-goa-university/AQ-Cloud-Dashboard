from typing import Any
from prophet import Prophet


class InferenceService:
    def __init__(self):
        self.model = Prophet(daily_seasonality="True")
        
    def train_model(self, df: Any):
        self.model.fit(df)
        
    def predict(self, hours_ahead: int):
        future = self.model.make_future_dataframe(periods=hours_ahead, freq="H")
        forecast = self.model.predict(future)
        return forecast