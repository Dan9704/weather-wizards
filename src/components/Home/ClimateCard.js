import React, { useEffect, useState } from 'react';
import Papa from 'papaparse'; // Importing PapaParse library to parse CSV files

// ClimateCard component takes a temperature prop and displays climate data for matching temperature
const ClimateCard = ({ temperature }) => {
  // State to store all climate data from the CSV file
  const [climateData, setClimateData] = useState([]);
  
  // State to store only the entries that match the specified temperature
  const [matchingData, setMatchingData] = useState([]);
  
  // State to handle and display any errors that may occur during data fetching or parsing
  const [error, setError] = useState(null);

  // useEffect to fetch and parse the CSV file on component mount
  useEffect(() => {
    // Function to fetch climate data asynchronously
    const fetchClimateData = async () => {
      try {
        // Fetching the CSV file from the server
        const response = await fetch('/climate_change_agriculture_dataset.csv');
        
        // Using a reader to read the response stream
        const reader = response.body.getReader();
        const result = await reader.read();
        
        // Decoding the result to a string using UTF-8 encoding
        const decoder = new TextDecoder('utf-8');
        const csvData = decoder.decode(result.value);

        // Parsing the CSV data using PapaParse with specific options
        Papa.parse(csvData, {
          header: true, // Ensures the first row is treated as headers
          skipEmptyLines: true, // Skips any empty rows in the CSV
          complete: (results) => setClimateData(results.data), // Sets parsed data to climateData state
          error: () => setError("Failed to load CSV data"), // Sets error state if parsing fails
        });
      } catch (err) {
        console.error("Error fetching climate data:", err); // Logs the error to the console
        setError("Failed to fetch CSV file"); // Sets an error message to be displayed to the user
      }
    };

    fetchClimateData(); // Calls the fetch function when the component mounts
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // useEffect to filter data based on the specified temperature whenever temperature or climateData changes
  useEffect(() => {
    if (temperature !== null && climateData.length > 0) {
      // Filters climateData entries where the Temperature matches the given temperature
      const matches = climateData.filter(
        (data) => parseInt(data.Temperature) === temperature
      );
      setMatchingData(matches); // Updates matchingData with the filtered results
    }
  }, [temperature, climateData]); // Dependency array to re-run the effect when temperature or climateData changes

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  // Render the climate data cards
  return (
    <div className="climate-card-container">
      {matchingData.length > 0 ? (
        // If matching data is found, map through each matching data entry and display it
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
        // If no matching data is found, display a message
        <p>No matching climate data found for this temperature.</p>
      )}
    </div>
  );
};

export default ClimateCard; // Export the component so it can be used in other parts of the application
