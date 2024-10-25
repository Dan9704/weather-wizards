import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import WeatherCard from './WeatherCard';

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    // Retrieve CSV data from local storage
    const storedCSVData = localStorage.getItem('weatherDataCSV');

    if (storedCSVData) {
      // Parse the CSV data using Papa Parse
      Papa.parse(storedCSVData, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          setWeatherData(results.data);  // Set the parsed data to state
        },
      });
    }
  }, []);

  return (
    <div className="weather-container">
      {weatherData.length > 0 ? (
        weatherData.map((weather, index) => (
          <WeatherCard
            key={index}
            time={weather['time-local']}
            maxTemp={weather['maximum_air_temperature']}
            windSpeed={weather['wind_spd_kmh']}
            windDir={weather['wind_dir']}
            humidity={weather['rel-humidity']}
            rainfall={weather['rainfall']}
          />
        ))
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default WeatherCard;
