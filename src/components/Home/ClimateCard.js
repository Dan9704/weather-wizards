import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
// import './ClimateCard.css'; // Add your custom styles here

const ClimateCard = () => {
  const [climateData, setClimateData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClimateData = async () => {
      try {
        const response = await fetch('/climate_change_agriculture_dataset.csv');
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csvData = decoder.decode(result.value);

        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            setClimateData(results.data);
          },
          error: (err) => setError("Failed to load CSV data"),
        });
      } catch (err) {
        console.error("Error fetching climate data:", err);
        setError("Failed to fetch CSV file");
      }
    };

    fetchClimateData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % climateData.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + climateData.length) % climateData.length);
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  const currentData = climateData[currentIndex];

  return (
    <div className="climate-card-container">
      {currentData ? (
        <div className="climate-card">
          <h2>Climate Data #{currentIndex + 1}</h2>
          <p><strong>Temperature:</strong> {currentData.Temperature}</p>
          <p><strong>Precipitation:</strong> {currentData.Precipitation}</p>
          <p><strong>CO2 Levels:</strong> {currentData['CO2 Levels']}</p>
          <p><strong>Crop Yield:</strong> {currentData['Crop Yield']}</p>
          <p><strong>Soil Health:</strong> {currentData['Soil Health']}</p>
          <p><strong>Extreme Weather Events:</strong> {currentData['Extreme Weather Events']}</p>
          <p><strong>Crop Disease Incidence:</strong> {currentData['Crop Disease Incidence']}</p>
          <p><strong>Water Availability:</strong> {currentData['Water Availability']}</p>
          <p><strong>Food Security:</strong> {currentData['Food Security']}</p>
          <p><strong>Economic Impact:</strong> {currentData['Economic Impact']}</p>
        </div>
      ) : (
        <p>Loading climate data...</p>
      )}
      <div className="card-navigation">
        <button onClick={handlePrevious} className="nav-button">Previous</button>
        <button onClick={handleNext} className="nav-button">Next</button>
      </div>
    </div>
  );
};

export default ClimateCard;
