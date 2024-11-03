// src/components/EconomicImpactBarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

function EconomicImpactBarChart({ data, labels, title }) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Economic Impact',
        data: data,
        backgroundColor: 'rgba(255,99,132,0.6)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
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
          text: 'Economic Impact',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Precipitation',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default EconomicImpactBarChart;
