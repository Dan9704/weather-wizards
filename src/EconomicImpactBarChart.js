import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import * as d3 from 'd3-fetch';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const MultiLineChart = () => {
  // States to hold data
  const [temperature, setTemperature] = useState([]);
  const [co2Levels, setCo2Levels] = useState([]);
  const [cropYield, setCropYield] = useState([]);
  const [soilHealth, setSoilHealth] = useState([]);

  // Load data from CSV
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await d3.csv('/climate_change_agriculture_dataset.csv');
        
        // Choose every nth point to avoid a crowded graph
        const n = 5;
        const sampledData = data.filter((_, index) => index % n === 0);

        // Parse data for each metric
        const temperatureData = sampledData.map(entry => parseFloat(entry['Temperature']) || 0);
        const co2Data = sampledData.map(entry => parseFloat(entry['CO2 Levels']) || 0);
        const cropYieldData = sampledData.map(entry => parseFloat(entry['Crop Yield']) || 0);
        const soilHealthData = sampledData.map(entry => parseFloat(entry['Soil Health']) || 0);

        setTemperature(temperatureData);
        setCo2Levels(co2Data);
        setCropYield(cropYieldData);
        setSoilHealth(soilHealthData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  const chartData = {
    labels: temperature, // X-axis (Temperature or other common variable)
    datasets: [
      {
        label: 'CO2 Levels',
        data: co2Levels,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)', // Color for CO2 Levels
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
      {
        label: 'Crop Yield',
        data: cropYield,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)', // Color for Crop Yield
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
      },
      {
        label: 'Soil Health',
        data: soilHealth,
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)', // Color for Soil Health
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Values',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Temperature',
        },
      },
    },
  };

  return (
    <div style={{ width: '800px', height: '500px', margin: '0 auto' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MultiLineChart;
