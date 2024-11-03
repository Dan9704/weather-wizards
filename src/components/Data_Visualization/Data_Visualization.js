import React, { useState, useEffect } from 'react';
import * as d3 from 'd3-fetch';
import LineChart from '../../LineChart';
import WindSpeedBarChart from '../../WindSpeedBarChart';
import WindDirectionPieChart from '../../WindDirectionPieChart';
import HumidityRainfallStackedChart from '../../HumidityRainfallStackedChart';
import Particle from '../Particle';
import { Container, Row, Col } from "react-bootstrap";
import CropYieldLineChart from '../../CropYieldLineChart';
import EconomicImpactBarChart from '../../EconomicImpactBarChart';

function Data_Visualization() {
  const [weatherData, setWeatherData] = useState([]);
  const [climateData, setClimateData] = useState([]);

  useEffect(() => {
    async function fetchWeatherData() {
      const melbourneData = await d3.csv('/weatherDataMelbourneOlympicPark1.csv');
      const ceberusData = await d3.csv('/weatherDataCeberus1.csv');
      setWeatherData([...melbourneData, ...ceberusData]);
    }

    async function fetchClimateData() {
      const climateChangeData = await d3.csv('/climate_change_agriculture_dataset.csv');
      console.log(climateChangeData);  // Log data to check
      setClimateData(climateChangeData);
    }

    fetchWeatherData();
    fetchClimateData();
  }, []);

  // Weather data processing
  const timestamps = weatherData.map(entry => entry['time-local']);
  const maxTemps = weatherData.map(entry => parseFloat(entry['maximum_air_temperature']));
  const windSpeeds = weatherData.map(entry => parseFloat(entry['wind_spd_kmh']));
  const windDirections = weatherData.map(entry => entry['wind_dir']);
  const humidityData = weatherData.map(entry => parseFloat(entry['rel-humidity']));

  // Climate change data processing
  const cropYield = climateData.map(entry => parseFloat(entry['Crop Yield']));
  const economicImpact = climateData.map(entry => entry['Economic Impact']);
  const temperature = climateData.map(entry => parseFloat(entry['Temperature']));
  const precipitation = climateData.map(entry => parseFloat(entry['Precipitation']));

  return (
    <Container fluid className="home-section" id="home">
      <Particle />
      <Container className="home-content">

        <div className="visualization-container">
          <h1 className="heading-name">
            <strong className="main-name">Weather and Climate Data Analysis</strong>
          </h1>
          
          {/* Weather Data Visualizations */}
          <div className="charts-container">
            <h2 className="section-title">Weather Data Analysis</h2>
            <div className="chart-box">
              <div className="chart-title">Max Temperature (°C)</div>
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
              <div className="chart-title">Crop Yield Over Time</div>
              <div className="chart-content">
                <CropYieldLineChart data={cropYield} labels={temperature} title="Crop Yield Over Time (vs. Temperature)" />
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
