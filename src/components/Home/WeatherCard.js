import React, { useEffect, useState } from 'react';
import Papa from 'papaparse'; // Importing PapaParse library to parse CSV files

// WeatherCard component displays weather data based on user-selected location, date, and time
const WeatherCard = ({ onTemperatureChange }) => {
  // State variables for managing weather data, location, date, time, filtered data, error messages, and temperature
  const [weatherData, setWeatherData] = useState([]); // Stores all parsed weather data from the CSV file
  const [selectedLocation, setSelectedLocation] = useState('Cerberus'); // Default location selected
  const [selectedDate, setSelectedDate] = useState(''); // Stores the selected date
  const [selectedTime, setSelectedTime] = useState(''); // Stores the selected time
  const [filteredData, setFilteredData] = useState(null); // Stores data matching the selected date and time
  const [error, setError] = useState(null); // Stores error messages, if any

  const [roundedTemperature, setRoundedTemperature] = useState(null); // Stores the rounded temperature value

  // useEffect to fetch and parse CSV data whenever the selected location or date changes
  useEffect(() => {
    const fetchData = async () => {
      // Determine the CSV file to load based on the selected location
      const fileName =
        selectedLocation === 'Cerberus'
          ? 'weatherDataCeberus.csv'
          : 'weatherDataMelbourneOlympicPark.csv';

      console.log(`Fetching file: ${fileName}`);
      
      try {
        // Fetch the CSV file from the server
        const response = await fetch(`/${fileName}`);
        
        // If response is not OK, throw an error
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV file: ${response.statusText}`);
        }

        // Read the response body as a stream
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csvData = decoder.decode(result.value);

        // Parse the CSV data using PapaParse
        Papa.parse(csvData, {
          header: true, // Treat the first row as headers
          skipEmptyLines: true, // Skip any empty rows in the CSV
          complete: (results) => {
            console.log("Parsed CSV Data:", results.data);
            setWeatherData(results.data); // Store parsed data in weatherData
            setFilteredData(null); // Reset filtered data when new data is loaded
            setError(null); // Clear any previous errors
          },
        });
      } catch (error) {
        console.error("Fetch error:", error); // Log error to console
        setError("Failed to load CSV data"); // Set error message for display
      }
    };

    fetchData(); // Fetch data whenever location or date changes
  }, [selectedLocation, selectedDate]); // Dependencies to re-run effect on location or date change

  // Function to update filtered data based on selected date and time
  const updateFilteredData = () => {
    // Format selectedTime to include seconds if necessary
    const formattedTime = selectedTime.length === 5 ? `${selectedTime}:00` : selectedTime;
    const dateTime = `${selectedDate}T${formattedTime}+11:00`; // Combine date and time with timezone

    console.log('Trying to match dateTime:', dateTime);

    // Find the entry in weatherData that matches the selected dateTime
    const selectedData = weatherData.find(
      (data) => data['time-local'] && data['time-local'].trim() === dateTime
    );

    if (selectedData) {
      // Round and store the matched temperature
      const temperature = Math.round(parseFloat(selectedData['maximum_air_temperature']));
      setRoundedTemperature(temperature); // Update the rounded temperature state
      onTemperatureChange(temperature); // Pass temperature to parent component (Home)
      console.log("Matched Data:", selectedData);
      setFilteredData(selectedData); // Update filtered data with matched entry
      setError(null); // Clear any previous errors
    } else {
      // If no match is found, reset filteredData and set an error message
      console.log("No data matched for dateTime:", dateTime);
      setFilteredData(null);
      setError("No data found for the selected date and time. Please select a valid entry.");
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-card">
        <h2>Weather for:</h2>

        {/* Location Selector Dropdown */}
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)} // Update selected location
        >
          <option value="Cerberus">Cerberus</option>
          <option value="Melbourne Olympic Park">Melbourne Olympic Park</option>
        </select>

        {/* Date Input Field */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)} // Update selected date
        />

        {/* Time Input Field */}
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)} // Update selected time
        />

        {/* Button to Trigger Data Filtering */}
        <button onClick={updateFilteredData}>Load Weather Data</button>

        {/* Display error message if there is an error */}
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : filteredData ? (
          // If filtered data exists, display the weather details
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
          // Show loading message if no data is available
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherCard; // Export WeatherCard component to be used in other parts of the application
