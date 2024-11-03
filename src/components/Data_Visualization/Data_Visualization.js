// Importing necessary libraries and components
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3-fetch'; // Library for fetching and parsing CSV data
import LineChart from '../../LineChart'; // Line chart component for temperature
import WindSpeedBarChart from '../../WindSpeedBarChart'; // Bar chart component for wind speed
import WindDirectionPieChart from '../../WindDirectionPieChart'; // Pie chart for wind direction distribution
import HumidityRainfallStackedChart from '../../HumidityRainfallStackedChart'; // Stacked chart for humidity and rainfall
import Particle from '../Particle'; // Particle effect component for background visuals
import { Container } from "react-bootstrap"; // Bootstrap container for layout
import TempCrop from '../../TempCrop'; // Chart component for crop yield vs. temperature
import EconomicImpactBarChart from '../../EconomicImpactBarChart'; // Bar chart for economic impact by precipitation

// Main Data_Visualization component function
function Data_Visualization() {
  // State to store weather data from CSV files
  const [weatherData, setWeatherData] = useState([]);
  // State to store climate data related to agriculture and climate change
  const [climateData, setClimateData] = useState([]);

  // useEffect to fetch and set weather and climate data from CSV files
  useEffect(() => {
    // Function to fetch and parse weather data CSV files
    async function fetchWeatherData() {
      const melbourneData = await d3.csv('/weatherDataMelbourneOlympicPark1.csv');
      const ceberusData = await d3.csv('/weatherDataCeberus1.csv');
      setWeatherData([...melbourneData, ...ceberusData]); // Combine and set both datasets
    }

    // Function to fetch and parse climate change data CSV file
    async function fetchClimateData() {
      const climateChangeData = await d3.csv('/climate_change_agriculture_dataset.csv');
      console.log(climateChangeData);  // Log data to verify content
      setClimateData(climateChangeData); // Set the parsed data to state
    }

    // Fetch data when component mounts
    fetchWeatherData();
    fetchClimateData();
  }, []);

  // Extracting specific fields for weather data visualization
  const timestamps = weatherData.map(entry => entry['time-local']); // Timestamps
  const maxTemps = weatherData.map(entry => parseFloat(entry['air_temperature'])); // Max temperatures
  const windSpeeds = weatherData.map(entry => parseFloat(entry['wind_spd_kmh'])); // Wind speeds
  const windDirections = weatherData.map(entry => entry['wind_dir']); // Wind directions
  const humidityData = weatherData.map(entry => parseFloat(entry['rel-humidity'])); // Humidity data

  // Extracting specific fields for climate change data visualization
  const cropYield = climateData.map(entry => parseFloat(entry['Crop Yield'])); // Crop yield data
  const economicImpact = climateData.map(entry => entry['Economic Impact']); // Economic impact data
  const temperature = climateData.map(entry => parseFloat(entry['Temperature'])); // Temperature data for climate
  const precipitation = climateData.map(entry => parseFloat(entry['Precipitation'])); // Precipitation data

  return (
    <Container fluid className="home-section" id="home">
      <Particle /> {/* Background particle effect */}
      <Container className="home-content">

        <div className="visualization-container">
          <h1 className="heading-name">
            <strong className="main-name">Weather and Climate Data Analysis</strong>
          </h1>
          
          {/* Weather Data Visualizations */}
          <div className="charts-container">
            <h2 className="section-title">Weather Data Analysis</h2>
            <div className="chart-box">
              <div className="chart-title">Temperature (°C)</div>
              <div className="chart-content">
                <LineChart data={maxTemps} labels={timestamps} title="Max Temperature (°C)" />
              </div>
            </div>
            <div className="chart-box">
              <div className="chart-title">Wind Speed (km/h)</div>
              <div className="chart-content">
                <WindSpeedBarChart data={windSpeeds} labels={timestamps} title="Wind Speed (km/h)" />
              </div>
            </div>
            <div className="chart-box">
              <div className="chart-title">Wind Direction Distribution</div>
              <div className="chart-content">
                <WindDirectionPieChart data={windDirections} title="Wind Direction Distribution" />
              </div>
            </div>
            <div className="chart-box">
              <div className="chart-title">Humidity and Rainfall</div>
              <div className="chart-content">
                <HumidityRainfallStackedChart
                  humidityData={humidityData}
                  labels={timestamps}
                  title="Humidity and Rainfall"
                />
              </div>
            </div>
          </div>

          {/* Climate Change and Agriculture Data Visualizations */}
          <div className="charts-container">
            <h2 className="section-title">Climate Change and Agriculture Data Analysis</h2>
            <div className="chart-box">
              <div className="chart-title">Precipitation by Temperature</div>
              <div className="chart-content">
                <TempCrop data={cropYield} labels={temperature} title="Crop Yield Over Time (vs. Temperature)" />
              </div>
            </div>
            <div className="chart-box">
              <div className="chart-title">Economic Impact</div>
              <div className="chart-content">
                <EconomicImpactBarChart data={economicImpact} labels={precipitation} title="Economic Impact by Precipitation Levels" />
              </div>
            </div>
          </div>

        </div>
      </Container>
    </Container>
  );
}

export default Data_Visualization;
