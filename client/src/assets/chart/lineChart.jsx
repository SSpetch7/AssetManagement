import React from "react";
import { Line } from "react-chartjs-2";
import { 
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
 } from "chart.js";

 ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
 );

 const options = {
  scales: {
    y: {
      title: {
        display: true,
        text: 'จำนวนครุภัณฑ์'
      }
    },
    x: {
      
    },
  },
};

function LineChart({ chartData }) {
  return <Line data={chartData} options={options}/>;
}

export default LineChart;