import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('Cerberus');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch data when location or date changes
  useEffect(() => {
    const fetchData = async () => {
      const fileName =
        selectedLocation === 'Cerberus'
          ? 'weatherDataCeberus.csv'
          : 'weatherDataMelbourneOlympicPark.csv';

      console.log(`Fetching file: ${fileName}`);
      
      try {
        const response = await fetch(`/${fileName}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV file: ${response.statusText}`);
        }

        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csvData = decoder.decode(result.value);

        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log("Parsed CSV Data:", results.data);
            setWeatherData(results.data);
            setFilteredData(null); // Reset filtered data on new load
            setError(null);
          },
        });
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to load CSV data");
      }
    };

    fetchData();
  }, [selectedLocation, selectedDate]);

  const updateFilteredData = () => {
    const formattedTime = selectedTime.length === 5 ? `${selectedTime}:00` : selectedTime;
    const dateTime = `${selectedDate}T${formattedTime}+11:00`;

    console.log('Trying to match dateTime:', dateTime);

    const selectedData = weatherData.find(
      (data) => data['time-local'] && data['time-local'].trim() === dateTime
    );

    if (selectedData) {
      console.log("Matched Data:", selectedData);
      setFilteredData(selectedData);
      setError(null);
    } else {
      console.log("No data matched for dateTime:", dateTime);
      setFilteredData(null);
      setError("No data found for the selected date and time. Please select a valid entry.");
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-card">
        <h2>Weather for:</h2>

        {/* Location Selector */}
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="Cerberus">Cerberus</option>
          <option value="Melbourne Olympic Park">Melbourne Olympic Park</option>
        </select>

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
