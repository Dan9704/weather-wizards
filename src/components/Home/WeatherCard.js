import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';  // CSV parsing library

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    // Fetch the CSV file from the public folder
    const fetchData = async () => {
      const response = await fetch('/weatherDataCeberus.csv');  // Fetch the CSV file
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csvData = decoder.decode(result.value);  // Convert bytes to string

      // Parse the CSV data
      Papa.parse(csvData, {
        header: true,         // Use the first row as the header
        skipEmptyLines: true, // Skip empty lines
        complete: function(results) {
          console.log('Parsed Data: ',results.data);  // Log parsed data for debugging
          setWeatherData(results.data);  // Store parsed data in state
        },
      });
    };

    fetchData();  // Call the fetch function when the component loads
  }, []);

  return (
    <div className="weather-container">
      {weatherData.length > 0 ? (
        weatherData.map((weather, index) => (
          <div className="weather-card" key={index}>
            <h2>{weather['time-local']}</h2>
            <p>Max Temperature: {weather['maximum_air_temperature']} °C</p>
            <p>Wind Speed: {weather['wind_spd_kmh']} km/h</p>
            <p>Wind Direction: {weather['wind_dir']}</p>
            <p>Humidity: {weather['rel-humidity']} %</p>
            <p>Rainfall: {weather['rainfall']} mm</p>
          </div>
        ))
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherCard;
