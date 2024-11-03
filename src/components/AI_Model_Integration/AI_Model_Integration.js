import React, { useState } from 'react';
import axios from 'axios';
import Particle from "../Particle";
import { Container, Row, Col } from "react-bootstrap";

// Main component for AI model integration
const AI_Model_Integration = () => {
    // Initialize state variables
    const [inputData, setInputData] = useState({ rel_humidity: '', wind_spd: '', msl_pres: '', rainfall: '', air_temperature: '', dew_point: '' });
    const [model, setModel] = useState("gradient_boost"); // Determines which prediction model to use
    const [location, setLocation] = useState("melbourne"); // Stores the selected location
    const [prediction, setPrediction] = useState(null); // Holds the prediction result
    const [loading, setLoading] = useState(false); // Manages loading state during API call
    const [error, setError] = useState(null); // Stores any errors during prediction

    // Updates the input data state for each field
    const handleChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    // Update model type based on user selection
    const handleModelChange = (e) => setModel(e.target.value);
    // Update location based on user selection
    const handleLocationChange = (e) => setLocation(e.target.value);

    // Handles form submission and API request
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when submitting
        setError(null); // Clear any existing errors

        // Construct the API endpoint dynamically based on model and location
        const endpoint = `http://127.0.0.1:8000/predict/${model}/${location}`;

        // Prepare data to send to the server, depending on the selected model
        const formattedData = model === "gradient_boost" ? {
            air_temperature: parseFloat(inputData.air_temperature) || null,
            dew_point: parseFloat(inputData.dew_point) || null,
            wind_spd: parseFloat(inputData.wind_spd) || 0,
            msl_pres: parseFloat(inputData.msl_pres) || 0,
            rainfall: parseFloat(inputData.rainfall) || 0
        } : {
            "rel-humidity": parseFloat(inputData.rel_humidity) || null,
            wind_spd: parseFloat(inputData.wind_spd) || 0,
            msl_pres: parseFloat(inputData.msl_pres) || 0,
            rainfall: parseFloat(inputData.rainfall) || 0
        };

        // Send the request to the API and handle the response
        try {
            const response = await axios.post(endpoint, formattedData);
            setPrediction(response.data.prediction); // Store prediction in state
        } catch (error) {
            console.error("Error:", error); // Log any error to console
            setError("Failed to retrieve prediction. Please check the console for more details.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
    <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
            <div className="integration-container ai-model-integration-page">
                <form className="integration-form" onSubmit={handleSubmit}>
                    <h2 className="form-label full-width">AI Model Integration - Prediction Box</h2>
                    
                    {/* Conditional input fields based on selected model */}
                    {model === "gradient_boost" ? (
                        <>
                            <div className="form-group">
                                <label className="form-label">Air Temperature: (0.0°C - 20.0°C)</label>
                                <input name="air_temperature" value={inputData.air_temperature} onChange={handleChange} className="form-input" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Dew Point: (5.0 - 20.0)</label>
                                <input name="dew_point" value={inputData.dew_point} onChange={handleChange} className="form-input" />
                            </div>
                        </>
                    ) : (
                        <div className="form-group full-width">
                            <label className="form-label">Relative Humidity: (0.0% - 100.0%)</label>
                            <input name="rel_humidity" value={inputData.rel_humidity} onChange={handleChange} className="form-input" />
                        </div>
                    )}

                    {/* Common input fields for both models */}
                    <div className="form-group">
                        <label className="form-label">Wind Speed: (0.0 - 40.0)</label>
                        <input name="wind_spd" value={inputData.wind_spd} onChange={handleChange} className="form-input" />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">MSL Pressure: (980.0 - 1050.0)</label>
                        <input name="msl_pres" value={inputData.msl_pres} onChange={handleChange} className="form-input" />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Rainfall: (0 or 1)</label>
                        <input name="rainfall" value={inputData.rainfall} onChange={handleChange} className="form-input" />
                    </div>

                    {/* Dropdowns for model and location selection */}
                    <div className="dropdown-row full-width">
                        <div className="form-group">
                            <label className="form-label">Required Prediction:</label>
                            <select value={model} onChange={handleModelChange} className="form-select">
                                <option value="gradient_boost">Humidity (Gradient Boosting)</option>
                                <option value="linear_regr">Temperature (Linear Regression)</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Select Location:</label>
                            <select value={location} onChange={handleLocationChange} className="form-select">
                                <option value="melbourne">Melbourne Olympic Park</option>
                                <option value="cerberus">Cerberus</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit button */}
                    <button type="submit" disabled={loading} className="submit-button">
                        {loading ? 'Loading...' : 'Get Prediction'}
                    </button>

                    {/* Display error or prediction result */}
                    {error && <p className="error-message">{error}</p>}
                    {prediction !== null && (
                        <div className="prediction-result">
                            <h3>Prediction Result</h3>
                            <p>{model === "gradient_boost" ? `Humidity: ${prediction} %` : `Temperature: ${prediction} °C`}</p>
                        </div>
                    )}
                </form>
            </div>
        </Container>
    </Container>
    );
};

export default AI_Model_Integration;
