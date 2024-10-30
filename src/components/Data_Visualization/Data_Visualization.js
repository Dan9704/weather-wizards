import React, { useState, useEffect } from 'react';
import * as d3 from 'd3-fetch';
import LineChart from '../../LineChart';
import WindSpeedBarChart from '../../WindSpeedBarChart';
import WindDirectionPieChart from '../../WindDirectionPieChart';
import HumidityRainfallStackedChart from '../../HumidityRainfallStackedChart';


function Data_Visualization() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const melbourneData = await d3.csv('/weatherDataMelbourneOlympicPark.csv');
      const ceberusData = await d3.csv('/weatherDataCeberus.csv');
      setData([...melbourneData, ...ceberusData]);
    }

    fetchData();
  }, []);

  const timestamps = data.map(entry => entry['time-local']);
  const maxTemps = data.map(entry => parseFloat(entry['maximum_air_temperature']));
  const windSpeeds = data.map(entry => parseFloat(entry['wind_spd_kmh']));
  const windDirections = data.map(entry => entry['wind_dir']);
  const humidityData = data.map(entry => parseFloat(entry['rel-humidity']));

  return (
    <div>
      <h1>Weather Data Overview</h1>
      <div className="charts-container">
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
          <div className="chart-title">Humidity</div>
          <div className="chart-content">
            <HumidityRainfallStackedChart
              humidityData={humidityData}
              
              labels={timestamps}
              title="Humidity and Rainfall"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Data_Visualization;