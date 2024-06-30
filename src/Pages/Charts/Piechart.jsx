import React, { useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChart = ({ data }) => {
    const pieChartRef = useRef(null);

    useEffect(() => {
        return () => {
          // Cleanup function to destroy the chart instance
          // This ensures that the canvas element is properly destroyed when the component is unmounted
          const chartInstance = pieChartRef.current?.chartInstance; // Check if pieChartRef.current is not null
          if (chartInstance) {
            chartInstance.destroy();
          }
        };
      }, []);

  return (
    <div>
      <div>
      <Pie ref={pieChartRef} data={data} />
    </div>
    </div>
  );
};

export default PieChart;
