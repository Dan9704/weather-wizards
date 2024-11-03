# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import ModelInput, PredictionResponse  # Import data models for request and response validation
from predict import predict_gradient_boost, predict_linear_regr  # Import prediction functions

# Initialize FastAPI application
app = FastAPI()

# Configure CORS (Cross-Origin Resource Sharing) to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from local frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Endpoint for humidity prediction using Gradient Boosting model
@app.post("/predict/gradient_boost/{location}", response_model=PredictionResponse, summary="Predict Relative Humidity")
async def gradient_boost_prediction(location: str, input_data: ModelInput):
    try:
        # Check if location is valid
        if location not in ["melbourne", "cerberus"]:
            raise HTTPException(status_code=400, detail="Invalid location. Use 'melbourne' or 'cerberus'.")
        
        # Perform prediction and return result
        return predict_gradient_boost(input_data, location)
    except Exception as e:
        # Log and handle any prediction errors
        print("Error in Gradient Boost Prediction:", e)
        raise HTTPException(status_code=500, detail="An error occurred during prediction. Check the server logs for details.")

# Endpoint for temperature prediction using Linear Regression model
@app.post("/predict/linear_regr/{location}", response_model=PredictionResponse, summary="Predict Temperature")
async def linear_regr_prediction(location: str, input_data: ModelInput):
    try:
        # Check if location is valid
        if location not in ["melbourne", "cerberus"]:
            raise HTTPException(status_code=400, detail="Invalid location. Use 'melbourne' or 'cerberus'.")
        
        # Perform prediction and return result
        return predict_linear_regr(input_data, location)
    except Exception as e:
        # Log and handle any prediction errors
        print("Error in Linear Regression Prediction:", e)
        raise HTTPException(status_code=500, detail="An error occurred during prediction. Check the server logs for details.")

# Root endpoint to confirm server is running
@app.get("/")
async def root():
    return {"message": "Welcome to the Weather Wizards."}
