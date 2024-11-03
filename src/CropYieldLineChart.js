// src/components/CropYieldLineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

function CropYieldLineChart({ data, labels, title }) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Crop Yield',
        data: data,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Crop Yield',
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

  return <Line data={chartData} options={options} />;
}

export default CropYieldLineChart;
