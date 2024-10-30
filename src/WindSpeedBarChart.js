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

const WindSpeedBarChart = ({ data, labels, title }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: 'steelblue',
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
      x: { beginAtZero: true },
    },
  };

  return <div style={{ width: '1800px', height: '500px' }}><Bar data={chartData} options={options} /></div>;
};

export default WindSpeedBarChart;

  
