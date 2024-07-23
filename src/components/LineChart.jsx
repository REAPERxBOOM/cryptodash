import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({ chartData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if(chartData?.prices) {
        chartData.prices.map((item) => {
            dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0, -5)}`, item[1]]);
        })
      setData(dataCopy);
    }
  }, [chartData])

  const options = {
    backgroundColor: 'transparent', // Change this to your desired background color
    hAxis: {
      title: 'Date',
      textStyle: {
        color: '#ffffff',  // Change color of the horizontal axis labels
      },
      titleTextStyle: {
        color: '#ffffff'  // Change color of the horizontal axis title
      },
      gridlines: {
        color: '#555'  // Change color of the horizontal gridlines
      },
    },
    vAxis: {
      title: 'Prices',
      textStyle: {
        color: '#ffffff',  // Change color of the vertical axis labels
      },
      titleTextStyle: {
        color: '#ffffff'  // Change color of the vertical axis title
      },
      gridlines: {
        color: '#333'  // Change color of the vertical gridlines
      }
    },
    legend: { position: 'top-right',
        textStyle: {
            color: '#ffffff'  // Change color of the legend text
          }
     },
  };

  return (
    <div className='border-[1px] border-zinc-700 rounded-lg overflow-hidden h-[500px] py-10'>
      <Chart
        chartType='LineChart'
        data={data}
        options={options}
        width={'100%'}
        height={'100%'}
        legendToggle
      />
    </div>
  )
}

export default LineChart
