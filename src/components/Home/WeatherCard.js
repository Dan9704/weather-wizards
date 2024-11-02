import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/weatherDataCeberus.csv');
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csvData = decoder.decode(result.value);

        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            setWeatherData(results.data);
            if (results.data.length > 0) {
              // Initialize with the first entry in dataset
              const initialDateTime = results.data[0]['time-local'];
              const initialDate = initialDateTime.split('T')[0];
              const initialTime = initialDateTime.split('T')[1].split('+')[0];
              setSelectedDate(initialDate);
              setSelectedTime(initialTime);
              setFilteredData(results.data[0]);
            }
          },
        });
      } catch (error) {
        setError("Failed to load CSV data");
      }
    };

    fetchData();
  }, []);

  const updateFilteredData = () => {
    // Format the selected time to match the CSV format, ensuring seconds if needed
    const formattedTime = selectedTime.length === 5 ? `${selectedTime}:00` : selectedTime; 
    const dateTime = `${selectedDate}T${formattedTime}+11:00`;

    console.log('Trying to match dateTime:', dateTime);

    const selectedData = weatherData.find(
      (data) => data['time-local'].trim() === dateTime
    );

    if (selectedData) {
      setFilteredData(selectedData);
      setError(null);
    } else {
      setFilteredData(null);
      setError("No data found for the selected date and time. Please select a valid entry.");
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-card">
        <h2>Weather for:</h2>

        {/* Date Input */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {/* Time Input */}
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />

        <button onClick={updateFilteredData}>Load Weather Data</button>

        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : filteredData ? (
          <>
            <div className="temperature">
              {filteredData['maximum_air_temperature']}°C
            </div>
            <div className="weather-details">
              <p>🌬️ {filteredData['wind_spd_kmh']} km/h</p>
              <p>🧭 {filteredData['wind_dir']}</p>
              <p>💧 {filteredData['rel-humidity']} %</p>
              <p>☔ {filteredData['rainfall']} mm</p>
            </div>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
