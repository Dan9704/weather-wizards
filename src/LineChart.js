import React from 'react';
import { Line } from 'react-chartjs-2'; // Import Line here
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data, labels, title }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        fill: false,
        borderColor: 'teal',
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

  return <div style={{ width: '1800px', height: '500px' }}><Line data={chartData} options={options} /></div>;
};

export default LineChart;

