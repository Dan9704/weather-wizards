import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const ClimateCard = ({ temperature }) => {
  const [climateData, setClimateData] = useState([]);
  const [matchingData, setMatchingData] = useState([]);
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
          complete: (results) => setClimateData(results.data),
          error: () => setError("Failed to load CSV data"),
        });
      } catch (err) {
        console.error("Error fetching climate data:", err);
        setError("Failed to fetch CSV file");
      }
    };

    fetchClimateData();
  }, []);

  useEffect(() => {
    if (temperature !== null && climateData.length > 0) {
      const matches = climateData.filter(
        (data) => parseInt(data.Temperature) === temperature
      );
      setMatchingData(matches);
    }
  }, [temperature, climateData]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="climate-card-container">
      {matchingData.length > 0 ? (
        matchingData.map((data, index) => (
          <div className="climate-card" key={index}>
            <h2>Climate Data #{index + 1} for Temperature {temperature}°C</h2>
            <p><strong>Precipitation:</strong> {data.Precipitation}</p>
            <p><strong>CO2 Levels:</strong> {data['CO2 Levels']}</p>
            <p><strong>Crop Yield:</strong> {data['Crop Yield']}</p>
            <p><strong>Soil Health:</strong> {data['Soil Health']}</p>
            <p><strong>Extreme Weather Events:</strong> {data['Extreme Weather Events']}</p>
            <p><strong>Crop Disease Incidence:</strong> {data['Crop Disease Incidence']}</p>
            <p><strong>Water Availability:</strong> {data['Water Availability']}</p>
            <p><strong>Food Security:</strong> {data['Food Security']}</p>
            <p><strong>Economic Impact:</strong> {data['Economic Impact']}</p>
          </div>
        ))
      ) : (
        <p>No matching climate data found for this temperature.</p>
      )}
    </div>
  );
};

export default ClimateCard;
