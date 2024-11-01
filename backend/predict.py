# backend/predict.py
import joblib
import pandas as pd
from schemas import ModelInput, PredictionResponse

# Load models only once
gradient_boost_melbourne = joblib.load("models/gradient_boost_melbourne.pkl")
gradient_boost_cerberus = joblib.load("models/gradient_boost_cerberus.pkl")
linear_regr_melbourne = joblib.load("models/linear_regr_melbourne.pkl")
linear_regr_cerberus = joblib.load("models/linear_regr_cerberus.pkl")

def predict_gradient_boost(data: ModelInput, location: str):
    model = gradient_boost_melbourne if location == "melbourne" else gradient_boost_cerberus
    input_data = pd.DataFrame([data.dict(by_alias=True)])  # Use by_alias=True to get correct field names
    prediction = model.predict(input_data[['air_temperature', 'dew_point', 'wind_spd', 'msl_pres', 'rainfall']])
    return PredictionResponse(model="Gradient Boosting", location=location.capitalize(), prediction=prediction[0])

def predict_linear_regr(data: ModelInput, location: str):
    model = linear_regr_melbourne if location == "melbourne" else linear_regr_cerberus
    input_data = pd.DataFrame([data.dict(by_alias=True)])  # Use by_alias=True to get correct field names
    prediction = model.predict(input_data[['rel-humidity', 'wind_spd', 'msl_pres', 'rainfall']])
    return PredictionResponse(model="Linear Regression", location=location.capitalize(), prediction=prediction[0])
