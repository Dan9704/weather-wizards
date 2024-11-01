# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import ModelInput, PredictionResponse
from predict import predict_gradient_boost, predict_linear_regr

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust if front-end is on a different port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict/gradient_boost/{location}", response_model=PredictionResponse, summary="Predict Relative Humidity")
async def gradient_boost_prediction(location: str, input_data: ModelInput):
    try:
        if location not in ["melbourne", "cerberus"]:
            raise HTTPException(status_code=400, detail="Invalid location. Use 'melbourne' or 'cerberus'.")
        return predict_gradient_boost(input_data, location)
    except Exception as e:
        print("Error in Gradient Boost Prediction:", e)
        raise HTTPException(status_code=500, detail="An error occurred during prediction. Check the server logs for details.")

@app.post("/predict/linear_regr/{location}", response_model=PredictionResponse, summary="Predict Temperature")
async def linear_regr_prediction(location: str, input_data: ModelInput):
    try:
        if location not in ["melbourne", "cerberus"]:
            raise HTTPException(status_code=400, detail="Invalid location. Use 'melbourne' or 'cerberus'.")
        return predict_linear_regr(input_data, location)
    except Exception as e:
        print("Error in Linear Regression Prediction:", e)
        raise HTTPException(status_code=500, detail="An error occurred during prediction. Check the server logs for details.")

@app.get("/")
async def root():
    return {"message": "Welcome to the Weather Wizards."}
