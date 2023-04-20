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
        text: 'จำนวนครุภัณฑ์ทั้งหมด'
      }
    },
    x: {
      title: {
        display: true,
        text: 'ปี (ค.ศ.)'
      }
    },
  },
};

function LineChart2({ chart2Data }) {
  return <Line data={chart2Data} options={options}/>;
}

export default LineChart2;