import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [uniqueTimes, setUniqueTimes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
            // Extract unique dates and times
            const dates = [...new Set(results.data.map(item => item['time-local'].split('T')[0]))];
            const times = [...new Set(results.data.map(item => item['time-local'].split('T')[1].split('+')[0]))];
            console.log('Dates:', dates);
            setUniqueDates(dates);
            console.log('Times:', times);
            setUniqueTimes(times);

            // Set initial date and time based on first entry in dataset
            const initialDate = results.data[0]['time-local'].split('T')[0];
            const initialTime = results.data[0]['time-local'].split('T')[1].split('+')[0]; // Remove timezone offset
            setSelectedDate(initialDate);
            setSelectedTime(initialTime);
            setFilteredData(results.data[0]);
          }
        },
      });
    };

    fetchData();
  }, []);

  // Filter the data based on selected date and time
  const handleDateChange = (event) => {
    const date = event.target.value;
    console.log('Selected Date:', date);
    setSelectedDate(date);
    updateFilteredData(date, selectedTime);
  };

  const handleTimeChange = (event) => {
    const time = event.target.value;
    console.log('Selected Time:', time);
    setSelectedTime(time);
    updateFilteredData(selectedDate, time);
  };

  // Update the displayed data based on selected date and time
  const updateFilteredData = (date, time) => {
    const dateTime = `${date}T${time}`;
    console.log('DateTime:', dateTime);
    const selectedData = weatherData.find(
      (data) => data['time-local'] === dateTime
    );
    console.log('Selected Data:', selectedData);
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
            style={{ zIndex: 1, position: 'relative' }} // Ensure input is clickable
          >
            {uniqueDates.map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>

          {/* Time Select */}
          <select
            value={selectedTime}
            onChange={handleTimeChange}
            style={{ zIndex: 1, position: 'relative' }} // Ensure input is clickable
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