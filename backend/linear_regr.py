# Required Libraries
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# Load Dataset 1 (Melbourne Olympic Park Weather Data)
data1 = pd.read_csv('dataset/processed_melbourne_olympic.csv')
print('Melbourne Olympic Park Weather Data')

# Define independent (X) and dependent (y) variables
features = ['rel-humidity', 'wind_spd', 'msl_pres', 'rainfall']
X = data1[features]
y = data1['air_temperature']  # Temperature as the target

# Handle missing values
data1 = data1.dropna(subset=features + [y.name])

# Train-test split
split_index = int(len(data1) * 0.8)
X_train, X_test = X[:split_index], X[split_index:]
y_train, y_test = y[:split_index], y[split_index:]

# Train the Linear Regression Model
model_melbourne = LinearRegression()
model_melbourne.fit(X_train, y_train)

# Save the Melbourne model
joblib.dump(model_melbourne, "backend/models/linear_regr_melbourne.pkl")

# Make predictions on the test set and evaluate performance
y_pred = model_melbourne.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)
print(f"Melbourne Model - RMSE: {rmse}, R-squared (R²): {r2}")

# Load Dataset 2 (Cerberus Weather Data)
data2 = pd.read_csv('dataset/processed_cerberus.csv')
print('Cerberus Weather Data')

# Define independent (X) and dependent (y) variables for Cerberus dataset
features2 = ['rel-humidity', 'wind_spd', 'msl_pres', 'rainfall']
X_new = data2[features2]
y_new = data2['air_temperature']  # Temperature as the target

# Handle missing values
data2 = data2.dropna(subset=features2 + [y_new.name])

# Train-test split
split_index = int(len(data2) * 0.8)
X_new_train, X_new_test = X_new[:split_index], X_new[split_index:]
y_new_train, y_new_test = y_new[:split_index], y_new[split_index:]

# Train the Linear Regression Model for Cerberus
model_cerberus = LinearRegression()
model_cerberus.fit(X_new_train, y_new_train)

# Save the Cerberus model
joblib.dump(model_cerberus, "backend/models/linear_regr_cerberus.pkl")

# Make predictions on the test set and evaluate performance
y_new_pred = model_cerberus.predict(X_new_test)
rmse_new = np.sqrt(mean_squared_error(y_new_test, y_new_pred))
r2_new = r2_score(y_new_test, y_new_pred)
print(f"Cerberus Model - RMSE: {rmse_new}, R-squared (R²): {r2_new}")
