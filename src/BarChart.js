import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalBarSeries, Hint} from 'react-vis';

const BarChart = ({ data, week }) => {

  function formatData(person) {
    const formattedData = [];
   
    const maxWeek = week < 16 ? week : 16;
    let sum = 0;
    for (let i = 0; i <= maxWeek; i++){
      sum = sum + person.data[i];
    }
    formattedData.push({x: sum, y: person.title, color: person.color})
    return formattedData;
  }

  let series = data.map(person => formatData(person));
  series.sort(function(first, second) { return first[0].x < second[0].x ? -1 : 1; })
  series = series.map(data => {
      return (
      <HorizontalBarSeries
        colorType="literal"
        animation
        data={data}
      />);
    })

  return (
      <XYPlot
          yType="ordinal"
          yDistance={100}
          width={1500}
          height={450}>
          <VerticalGridLines style={{stroke: '#B7E9ED'}}/>
          <XAxis title='Wins' />
          <YAxis title='Player' />
          {series}
      </XYPlot>
  );
}
export default BarChart;