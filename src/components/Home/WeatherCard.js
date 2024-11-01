import React, { useEffect, useState } from 'react';

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [uniqueTimes, setUniqueTimes] = useState([]);

  useEffect(() => {
    // Sample data for testing purposes
    const sampleData = [
      { "time-local": "2022-01-01T06:00:00", "maximum_air_temperature": "20", "wind_spd_kmh": "15", "wind_dir": "N", "rel-humidity": "60", "rainfall": "0" },
      { "time-local": "2022-01-01T12:00:00", "maximum_air_temperature": "25", "wind_spd_kmh": "10", "wind_dir": "NE", "rel-humidity": "55", "rainfall": "0" },
      { "time-local": "2022-01-01T18:00:00", "maximum_air_temperature": "18", "wind_spd_kmh": "5", "wind_dir": "NW", "rel-humidity": "70", "rainfall": "1" },
      { "time-local": "2022-01-02T06:00:00", "maximum_air_temperature": "22", "wind_spd_kmh": "12", "wind_dir": "E", "rel-humidity": "65", "rainfall": "0" },
      { "time-local": "2022-01-02T12:00:00", "maximum_air_temperature": "28", "wind_spd_kmh": "18", "wind_dir": "SE", "rel-humidity": "50", "rainfall": "0" }
    ];

    // Set sample data directly
    setWeatherData(sampleData);

    // Extract unique dates and times
    const dates = [...new Set(sampleData.map(item => item['time-local'].split('T')[0]))];
    const times = [...new Set(sampleData.map(item => item['time-local'].split('T')[1]))];
    setUniqueDates(dates);
    setUniqueTimes(times);

    // Set initial date and time based on the first entry in the sample dataset
    const initialDate = sampleData[0]['time-local'].split('T')[0];
    const initialTime = sampleData[0]['time-local'].split('T')[1];
    setSelectedDate(initialDate);
    setSelectedTime(initialTime);
    setFilteredData(sampleData[0]);
  }, []);

  // Filter the data based on selected date and time
  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    updateFilteredData(date, selectedTime);
  };

  const handleTimeChange = (event) => {
    const time = event.target.value;
    setSelectedTime(time);
    updateFilteredData(selectedDate, time);
  };

  // Update the displayed data based on selected date and time
  const updateFilteredData = (date, time) => {
    const dateTime = `${date}T${time}`;
    const selectedData = weatherData.find(
      (data) => data['time-local'] === dateTime
    );
    setFilteredData(selectedData);
  };

  return (
    <div className="weather-container">
      {filteredData ? (
        <div className="weather-card">
          <h2>Weather for:</h2>

          {/* Date Select */}
          <select
            value={selectedDate}
            onChange={handleDateChange}
            style={{ zIndex: 100, position: 'relative' }}
          >
            {uniqueDates.map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>

          {/* Time Select */}
          <select
            value={selectedTime}
            onChange={handleTimeChange}
            style={{ zIndex: 100, position: 'relative' }}
          >
            {uniqueTimes.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>

          {/* Display weather data for the selected date and time */}
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
