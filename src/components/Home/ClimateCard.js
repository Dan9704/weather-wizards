import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

// Component to display climate data based on temperature input
const ClimateCard = ({ temperature }) => {
  const [climateData, setClimateData] = useState([]);  // State to hold the parsed CSV data
  const [averageData, setAverageData] = useState(null); // State to hold calculated averages for specific fields
  const [modes, setModes] = useState({}); // State to hold mode values for specific fields
  const [error, setError] = useState(null); // State to handle any errors

  // useEffect to fetch CSV data when the component mounts
  useEffect(() => {
    const fetchClimateData = async () => {
      try {
        // Fetch the CSV file
        const response = await fetch('/climate_change_agriculture_dataset.csv');
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csvData = decoder.decode(result.value);

        // Parse the CSV data using PapaParse library
        Papa.parse(csvData, {
          header: true, // Treat the first row as headers
          skipEmptyLines: true, // Skip any empty lines in the CSV file
          complete: (results) => setClimateData(results.data), // Store parsed data in climateData state
          error: () => setError("Failed to load CSV data"), // Set error if parsing fails
        });
      } catch (err) {
        console.error("Error fetching climate data:", err);
        setError("Failed to fetch CSV file"); // Set error if fetch fails
      }
    };

    fetchClimateData(); // Call the fetch function when component mounts
  }, []);

  // useEffect to calculate averages and modes based on the temperature
  useEffect(() => {
    if (temperature !== null && climateData.length > 0) {
      // Filter data to match the provided temperature
      const matches = climateData.filter(
        (data) => parseInt(data.Temperature) === temperature
      );

      if (matches.length > 0) {
        // Fields that require average calculation
        const fieldsToAverage = [
          "Precipitation",
          "CO2 Levels",
          "Crop Yield",
          "Soil Health"
        ];

        // Fields that require mode calculation
        const fieldsToMode = [
          "Water Availability",
          "Crop Disease Incidence",
          "Extreme Weather Events",
          "Food Security",
          "Economic Impact"
        ];

        // Calculate averages for specified fields
        const averages = fieldsToAverage.reduce((acc, field) => {
          const total = matches.reduce((sum, data) => sum + parseFloat(data[field] || 0), 0); // Sum values
          acc[field] = (total / matches.length).toFixed(2); // Calculate average and round to 2 decimal places
          return acc;
        }, {});

        // Calculate modes for specified fields
        const calculatedModes = fieldsToMode.reduce((acc, field) => {
          // Count occurrences of each value for the current field
          const counts = matches.reduce((countAcc, data) => {
            const value = data[field];
            if (value) {
              countAcc[value] = (countAcc[value] || 0) + 1;
            }
            return countAcc;
          }, {});

          // Find the value with the highest occurrence (mode)
          const modeValue = Object.keys(counts).reduce((a, b) => 
            counts[a] > counts[b] ? a : b
          );

          acc[field] = modeValue; // Store the mode value for the current field
          return acc;
        }, {});

        setAverageData(averages); // Update averageData state with calculated averages
        setModes(calculatedModes); // Update modes state with calculated modes
      } else {
        // Clear data if no matches are found
        setAverageData(null);
        setModes({});
      }
    }
  }, [temperature, climateData]);

  // Display error message if an error occurs
  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="climate-card-container">
      {averageData ? (
        // Display the climate card with averages and modes if data is available
        <div className="climate-card">
          <h2>Average Climate Data for Temperature {temperature}°C</h2>
          <p><strong>Precipitation:</strong> {averageData.Precipitation}</p>
          <p><strong>CO2 Levels:</strong> {averageData['CO2 Levels']}</p>
          <p><strong>Crop Yield:</strong> {averageData['Crop Yield']}</p>
          <p><strong>Soil Health:</strong> {averageData['Soil Health']}</p>
          <p><strong>Water Availability (Most Frequent):</strong> {modes['Water Availability']}</p>
          <p><strong>Crop Disease Incidence (Most Frequent):</strong> {modes['Crop Disease Incidence']}</p>
          <p><strong>Extreme Weather Events (Most Frequent):</strong> {modes['Extreme Weather Events']}</p>
          <p><strong>Food Security (Most Frequent):</strong> {modes['Food Security']}</p>
          <p><strong>Economic Impact (Most Frequent):</strong> {modes['Economic Impact']}</p>
        </div>
      ) : (
        // Display message if no data matches the given temperature
        <p>No matching climate data found for this temperature.</p>
      )}
    </div>
  );
};

export default ClimateCard;
