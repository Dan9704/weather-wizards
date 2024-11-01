import React, { useState } from 'react';
import axios from 'axios';

const AI_Model_Integration = () => {
    const [inputData, setInputData] = useState({ rel_humidity: '', wind_spd: '', msl_pres: '', rainfall: '', air_temperature: '', dew_point: '' });
    const [model, setModel] = useState("gradient_boost");
    const [location, setLocation] = useState("melbourne");
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const handleModelChange = (e) => setModel(e.target.value);
    const handleLocationChange = (e) => setLocation(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        setLoading(true);
        setError(null);

        const endpoint = `http://127.0.0.1:8000/predict/${model}/${location}`;
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

        try {
            const response = await axios.post(endpoint, formattedData);
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to retrieve prediction. Please check the console for more details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="integration-container">
            <form className="integration-form" onSubmit={handleSubmit}> {/* Use form tag here */}
                <h2 className="form-label full-width">AI Model Integration - Prediction Box</h2>
                
                {model === "gradient_boost" ? (
                    <>
                        <div className="form-group">
                            <label className="form-label">Air Temperature:</label>
                            <input name="air_temperature" value={inputData.air_temperature} onChange={handleChange} className="form-input" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Dew Point:</label>
                            <input name="dew_point" value={inputData.dew_point} onChange={handleChange} className="form-input" />
                        </div>
                    </>
                ) : (
                    <div className="form-group full-width">
                        <label className="form-label">Relative Humidity:</label>
                        <input name="rel_humidity" value={inputData.rel_humidity} onChange={handleChange} className="form-input" />
                    </div>
                )}

                <div className="form-group">
                    <label className="form-label">Wind Speed:</label>
                    <input name="wind_spd" value={inputData.wind_spd} onChange={handleChange} className="form-input" />
                </div>
                
                <div className="form-group">
                    <label className="form-label">MSL Pressure:</label>
                    <input name="msl_pres" value={inputData.msl_pres} onChange={handleChange} className="form-input" />
                </div>
                
                <div className="form-group">
                    <label className="form-label">Rainfall:</label>
                    <input name="rainfall" value={inputData.rainfall} onChange={handleChange} className="form-input" />
                </div>

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
                            <option value="melbourne">Melbourne Olymipic Park</option>
                            <option value="cerberus">Cerberus</option>
                        </select>
                    </div>
                </div>

                <button type="submit" disabled={loading} className="submit-button">
                    {loading ? 'Loading...' : 'Get Prediction'}
                </button>

                {error && <p className="error-message">{error}</p>}
                {prediction !== null && (
                    <div className="prediction-result">
                        <h3>Prediction Result</h3>
                        <p>Prediction: {prediction}</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default AI_Model_Integration;
