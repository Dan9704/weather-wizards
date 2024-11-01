import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import joblib

# Load dataset 1 
data = pd.read_csv('dataset/processed_melbourne_olympic.csv')
print(f'Melbourne Olympic Park Weather Data')
data.dropna(inplace=True)

# Define the independent variables (features)
features = ['air_temperature', 'dew_point', 'wind_spd', 'msl_pres', 'rainfall']
X = data[features]
y = data['rel-humidity'] # Target variable

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the Gradient Boosting Regressor model
gbr_melbourne = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)
gbr_melbourne.fit(X_train, y_train)

# Save the Melbourne model
joblib.dump(gbr_melbourne, "backend/models/gradient_boost_melbourne.pkl")

# Predict and evaluate on the test set
y_pred = gbr_melbourne.predict(X_test)
print(f"Melbourne Model - MSE: {mean_squared_error(y_test, y_pred):.4f}, MAE: {mean_absolute_error(y_test, y_pred):.4f}, R²: {r2_score(y_test, y_pred):.4f}")

# Load dataset 2 (Cerberus)
data2 = pd.read_csv('dataset/processed_cerberus.csv')
print(f'Cerberus Weather Data')
data2.dropna(inplace=True)

# Define features and target for dataset 2
X_new = data2[features]
y_new = data2['rel-humidity']

# Split the dataset
X_new_train, X_new_test, y_new_train, y_new_test = train_test_split(X_new, y_new, test_size=0.2, random_state=42)

# Initialize and train the Gradient Boosting Regressor model
gbr_cerberus = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)
gbr_cerberus.fit(X_new_train, y_new_train)

# Save the Cerberus model
joblib.dump(gbr_cerberus, "backend/models/gradient_boost_cerberus.pkl")

# Predict and evaluate on the test set
y_new_pred = gbr_cerberus.predict(X_new_test)
print(f"Cerberus Model - MSE: {mean_squared_error(y_new_test, y_new_pred):.4f}, MAE: {mean_absolute_error(y_new_test, y_new_pred):.4f}, R²: {r2_score(y_new_test, y_new_pred):.4f}")
