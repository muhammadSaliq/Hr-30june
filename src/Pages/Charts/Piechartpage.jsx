import React from 'react'
import PieChart from './Piechart';

export default function Piechartpage() {

    const pieChartData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'My Pie Chart',
            data: [12, 19, 3, 5, 2, 3], // Example data, you can set your own values here
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
            ],
          },
        ],
      };

  return (
    <div>
      <h2>Pie Chart Example</h2>
      <div className='h-[500px] w-[500px]'>
      <PieChart data={pieChartData} />
      </div>
    </div>
  )
}
