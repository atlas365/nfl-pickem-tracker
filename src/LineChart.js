import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';

const LineChart = ({ data, week }) => {

  console.log(week);
 
  function formatData(data) {
    const formattedData = [];
    let sum = 0;
    const maxWeek = week < 16 ? week : 16;
    for (let i = 0; i <= maxWeek; i++){
      sum = sum + data[i];
      formattedData.push({x:i,y:sum})
    }
    return formattedData;
  }

  const series = data.map(d => {
    return <LineSeries
      animation
      color={d.color}
      className='first-series'
      data={formatData(d.data)}
      style={{
        strokeLinejoin: 'round',
        strokeWidth: 2
      }}
    />
  })

  return (
      <XYPlot
          width={1500}
          height={450}>
          <VerticalGridLines style={{stroke: '#B7E9ED'}}/>
          <HorizontalGridLines style={{stroke: '#B7E9ED'}}/>
          <XAxis
            title='Week'
            style={{
              line: {stroke: '#ADDDE1'},
              ticks: {stroke: '#ADDDE1'},
              text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
            }}
          />
          <YAxis title='Wins' />
          {series}
      </XYPlot>
  );
}
export default LineChart;