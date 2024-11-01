import React from 'react';
import { Bar } from 'react-chartjs-2'; // Import Bar here
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HumidityRainfallStackedChart = ({ humidityData, rainfallData, labels, title }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Humidity (%)',
        data: humidityData,
        backgroundColor: 'teal',
      },
      
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true },
      x: { stacked: true, beginAtZero: true },
      y: { stacked: true },
    },
  };

  return <div style={{ width: '1800px', height: '500px' }}><Bar data={chartData} options={options} /></div>;
};

export default HumidityRainfallStackedChart;
