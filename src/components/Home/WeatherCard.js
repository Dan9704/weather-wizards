import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    // Fetch the CSV file from the public folder
    const fetchData = async () => {
      const response = await fetch('/weatherDataCeberus.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csvData = decoder.decode(result.value);

      // Parse the CSV data
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          setWeatherData(results.data);
          
          // Set initial selected date and time based on the first entry
          if (results.data.length > 0) {
            const initialDate = results.data[0]['time-local'].split('T')[0];
            setSelectedDate(initialDate);
            setSelectedTime(results.data[0]['time-local']);
            setFilteredData(results.data[0]);
          }
        },
      });
    };

    fetchData();
  }, []);

  // Extract unique dates from weatherData
  const uniqueDates = [...new Set(weatherData.map(data => data['time-local'].split('T')[0]))];

  // Filter times based on the selected date
  const timesForSelectedDate = weatherData
    .filter(data => data['time-local'].startsWith(selectedDate))
    .map(data => data['time-local']);

  // Handle date selection change
  const handleDateChange = (event) => {
    const selected = event.target.value;
    setSelectedDate(selected);

    // Automatically update the time dropdown to the first available time for the new date
    const firstAvailableTime = timesForSelectedDate[0];
    setSelectedTime(firstAvailableTime);

    // Find and set the data for the selected time
    const selectedData = weatherData.find(
      (data) => data['time-local'] === firstAvailableTime
    );
    setFilteredData(selectedData);
  };

  // Handle time selection change
  const handleTimeChange = (event) => {
    const selected = event.target.value;
    setSelectedTime(selected);

    // Find and set the data for the selected time
    const selectedData = weatherData.find(
      (data) => data['time-local'] === selected
    );
    setFilteredData(selectedData);
  };

  return (
    <div className="weather-container">
      {filteredData ? (
        <div className="weather-card">
          {/* Date Selection */}
          <h2>Weather for:</h2>
          <select onChange={handleDateChange} value={selectedDate}>
            {uniqueDates.map((date, index) => (
              <option key={index} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
          </select>

          {/* Time Selection */}
          <select onChange={handleTimeChange} value={selectedTime}>
            {timesForSelectedDate.map((time, index) => (
              <option key={index} value={time}>
                {new Date(time).toLocaleTimeString()}
              </option>
            ))}
          </select>

          {/* Display weather data for the selected time */}
          <div className="temperature">
            {filteredData['maximum_air_temperature']}°C
          </div>
          <div className="weather-details">
            <p>🌬️ {filteredData['wind_spd_kmh']} km/h</p>
            <p>🧭 {filteredData['wind_dir']}</p>
            <p>💧 {filteredData['rel-humidity']} %</p>
            <p>☔ {filteredData['rainfall']} mm</p>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherCard;
