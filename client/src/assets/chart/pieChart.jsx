import React from "react";
import { Pie } from "react-chartjs-2";
import { 
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
   } from "chart.js";
  
   ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
   );
  
   const options = {
    
  };

function PieChart({ chartData }) {
  return <Pie data={chartData} options={options}/>;
}

export default PieChart;