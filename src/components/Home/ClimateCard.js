import React, { useEffect, useState } from 'react';
import Papa from 'papaparse'; // Importing PapaParse library to parse CSV files

const ClimateCard = ({ temperature }) => {
  const [climateData, setClimateData] = useState([]);
  const [matchingData, setMatchingData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch and parse CSV data on mount
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

  // Filter data based on temperature whenever temperature or climateData changes
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

  // Calculate averages and most frequent values if there is matching data
  let averagedData = null;
  if (matchingData.length > 0) {
    const calculateAverage = (field) =>
      matchingData.reduce((acc, item) => acc + parseFloat(item[field] || 0), 0) / matchingData.length;

    const calculateMostFrequent = (field) => {
      const counts = matchingData.reduce((acc, item) => {
        const value = item[field];
        acc[value] = (acc[value] || 0) + 1;
        return acc;
      }, {});
      return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
    };

    averagedData = {
      Precipitation: calculateAverage('Precipitation').toFixed(2),
      CO2Levels: calculateAverage('CO2 Levels').toFixed(2),
      CropYield: calculateAverage('Crop Yield').toFixed(2),
      SoilHealth: calculateAverage('Soil Health').toFixed(2),
      ExtremeWeatherEvents: calculateMostFrequent('Extreme Weather Events'),
      CropDiseaseIncidence: calculateMostFrequent('Crop Disease Incidence'),
      WaterAvailability: calculateMostFrequent('Water Availability'),
      FoodSecurity: calculateMostFrequent('Food Security'),
      EconomicImpact: calculateMostFrequent('Economic Impact'),
    };
  }

  return (
    <div className="climate-card-container">
      {averagedData ? (
        <div className="climate-card">
          <h2>Climate Overview for Temperature {temperature}°C</h2>
          <p><strong>Average Precipitation:</strong> {averagedData.Precipitation}</p>
          <p><strong>Average CO2 Levels:</strong> {averagedData.CO2Levels}</p>
          <p><strong>Average Crop Yield:</strong> {averagedData.CropYield}</p>
          <p><strong>Average Soil Health:</strong> {averagedData.SoilHealth}</p>
          <p><strong>Most Frequent Extreme Weather Events:</strong> {averagedData.ExtremeWeatherEvents}</p>
          <p><strong>Most Frequent Crop Disease Incidence:</strong> {averagedData.CropDiseaseIncidence}</p>
          <p><strong>Most Frequent Water Availability:</strong> {averagedData.WaterAvailability}</p>
          <p><strong>Most Frequent Food Security:</strong> {averagedData.FoodSecurity}</p>
          <p><strong>Most Frequent Economic Impact:</strong> {averagedData.EconomicImpact}</p>
        </div>
      ) : (
        <p>No matching climate data found for this temperature.</p>
      )}
    </div>
  );
};

export default ClimateCard;
