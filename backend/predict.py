# backend/predict.py
import joblib
import pandas as pd
from schemas import ModelInput, PredictionResponse

# Load models only once
gradient_boost_melbourne = joblib.load("models/gradient_boost_melbourne.pkl")
gradient_boost_cerberus = joblib.load("models/gradient_boost_cerberus.pkl")
linear_regr_melbourne = joblib.load("models/linear_regr_melbourne.pkl")
linear_regr_cerberus = joblib.load("models/linear_regr_cerberus.pkl")

# Define Min and Max values for scaling based on the training data
scaling_info = {
    "rel_humidity": {"min": 0, "max": 100},  # Adjust according to the original processing
    "wind_spd": {"min": 0, "max": 40},    # Replace with actual min/max values used
    "msl_pres": {"min": 980.0, "max": 1050.0},
    "rainfall": {"min": 0, "max": 1},
    "air_temperature": {"min": 0, "max": 20.0}, 
    "dew_point": {"min": 5.0, "max": 20.0}
}

# Function for Min-Max scaling
def min_max_scaling(value, min_val, max_val):
    return (value - min_val) / (max_val - min_val)

# Preprocess inputs based on the scaling_info
def preprocess_inputs(data: ModelInput):
    processed_data = {}
    for feature, limits in scaling_info.items():
        value = getattr(data, feature, None)
        if value is not None:
            processed_data[feature] = min_max_scaling(value, limits["min"], limits["max"])
        else:
            processed_data[feature] = 0  # Default value if not provided, adjust as needed
    return processed_data

def predict_gradient_boost(data: ModelInput, location: str):
    model = gradient_boost_melbourne if location == "melbourne" else gradient_boost_cerberus
    
    # Preprocess input data
    processed_data = preprocess_inputs(data)
    
    input_data = pd.DataFrame([processed_data])
    prediction = model.predict(input_data[['air_temperature', 'dew_point', 'wind_spd', 'msl_pres', 'rainfall']])
    
    # Scale prediction back to original range if necessary
    humidity_prediction = round(prediction[0] * 100 , 2) # Scale to 0-100 for humidity, adjust as needed
    
    return PredictionResponse(model="Gradient Boosting", location=location.capitalize(), prediction=humidity_prediction)

def predict_linear_regr(data: ModelInput, location: str):
    model = linear_regr_melbourne if location == "melbourne" else linear_regr_cerberus
    
    # Preprocess input data
    processed_data = preprocess_inputs(data)
    
    # Rename 'rel_humidity' to 'rel-humidity' to match the model's expectations
    processed_data['rel-humidity'] = processed_data.pop('rel_humidity')  # Rename if it exists
    
    input_data = pd.DataFrame([processed_data])
    prediction = model.predict(input_data[['rel-humidity', 'wind_spd', 'msl_pres', 'rainfall']])
    
    # Scale prediction back to original range if necessary
    temperature_prediction = round(prediction[0] * 30 + 10 , 2)  # Adjust scaling to match your target range
    
    return PredictionResponse(model="Linear Regression", location=location.capitalize(), prediction=temperature_prediction)

