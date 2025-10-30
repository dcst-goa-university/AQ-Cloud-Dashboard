from pydantic import BaseModel

class AQIDataDTO(BaseModel):
    ds:str
    y:float