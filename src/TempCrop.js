import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import * as d3 from 'd3-fetch';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const TempCrop = () => {
  // State to hold the loaded data
  const [precipitation, setPrecipitation] = useState([]);
  const [temperature, setTemperature] = useState([]);

  // Load data from CSV and sample every nth point
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await d3.csv('/climate_change_agriculture_dataset.csv');
        
        // Choose every nth point (e.g., every 5th point)
        const n = 5; // Change this to control the sampling frequency
        const sampledData = data.filter((_, index) => index % n === 0);
        
        // Parse data for temperature and precipitation columns from the sampled data
        const precipitationData = sampledData.map(entry => parseFloat(entry['Precipitation']) || 0);
        const temperatureData = sampledData.map(entry => parseFloat(entry['Temperature']) || 0);

        setPrecipitation(precipitationData);
        setTemperature(temperatureData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  // Define chart data and options after data is loaded
  const chartData = {
    labels: temperature, // X-axis labels (Temperature)
    datasets: [
      {
        label: 'Precipitation',
        data: precipitation, // Y-axis data points (Precipitation)
        fill: false,
        borderColor: 'teal',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Precipitation' },
      },
      x: {
        title: { display: true, text: 'Temperature' },
      },
    },
  };

  return (
    <div style={{ width: '600px', height: '400px', margin: '0 auto' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TempCrop;
