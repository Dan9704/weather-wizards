import React from 'react';
import { Pie } from 'react-chartjs-2'; // Import Pie here
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const WindDirectionPieChart = ({ data, title }) => {
  const windDirectionCounts = data.reduce((acc, direction) => {
    acc[direction] = (acc[direction] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(windDirectionCounts);
  const values = Object.values(windDirectionCounts);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <div style={{ width: '1800px', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Pie data={chartData} />
    </div>
  );
  };

export default WindDirectionPieChart;
