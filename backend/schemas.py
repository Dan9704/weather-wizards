# backend/schemas.py
from pydantic import BaseModel, Field
from typing import Optional

class ModelInput(BaseModel):
    air_temperature: Optional[float] = None  # Only required for Gradient Boosting
    dew_point: Optional[float] = None        # Only required for Gradient Boosting
    rel_humidity: Optional[float] = Field(None, alias="rel-humidity")  # Alias to match expected JSON key

    wind_spd: float
    msl_pres: float
    rainfall: float

class PredictionResponse(BaseModel):
    model: str
    location: str
    prediction: float
