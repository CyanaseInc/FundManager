import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';

// Register the necessary scales
Chart.register(Chart.controllers.bar, Chart.scaleService.getScaleConstructor('category'));
Chart.register(Chart.controllers.bar);
const BarChart = () => {
  // Sample data for demonstration
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Investment Class A',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: [5000, 7000, 5500, 6000, 8000, 7500],
      },
      {
        label: 'Investment Class B',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: [3000, 4000, 3500, 2000, 5000, 4500],
      },
      {
        label: 'Investment Class C',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [2000, 3000, 2500, 3500, 4000, 3800],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '600px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
