import React, { useState, useEffect } from 'react'

import { Bar } from "@nivo/bar";

const BarComponent = props => {
  return (
      <g transform={`translate(${props.x},${props.y})`}>
          <rect
              x={-3}
              y={7}
              width={props.width}
              height={props.height}
              fill="rgba(0, 0, 0, .07)"
          />
          <rect width={props.width} height={props.height} fill={props.color} />
          <rect
              x={props.width - 5}
              width={5}
              height={props.height}
              fill={props.borderColor}
              fillOpacity={0.2}
          />
          <text
              x={props.width - 16}
              y={props.height / 2 - 8}
              textAnchor="end"
              dominantBaseline="central"
              fill="black"
              style={{
                  fontWeight: 900,
                  fontSize: 15,
              }}
          >
              {props.data.indexValue}
          </text>
          <text
              x={props.width - 16}
              y={props.height / 2 + 10}
              textAnchor="end"
              dominantBaseline="central"
              fill={props.borderColor}
              style={{
                  fontWeight: 400,
                  fontSize: 13,
              }}
          >
              {props.data.value}
          </text>
      </g>
  )
}

const RaceChart = ({ playerDataInput, week }) => {
  
  const playerData = [];
  playerDataInput.forEach(pd => {
    let sum = 0;
    for(let i = 0; i < week; i++) {
      sum = sum + pd.data[i];
    }
    playerData.push({id: pd.title, value: sum});
  });

  const barData = [...playerData].sort((a, b) => a.value - b.value);

  let playoffRound = undefined;
  switch(week) {
    case 18:
      playoffRound = "Wild Card Round";
      break;
    case 19:
      playoffRound = "Divisional Round";
      break;
    case 20:
      playoffRound = "Conference Championships";
      break;
    case 21:
      playoffRound = "Super Bowl";
      break;
    default:
      break;
  }

  return (
      <>
          <h2 style={{ marginLeft: 60, fontWeight: 400, color: '#555' }}>
             Standings after week {' '}
              <strong style={{ color: 'black', fontWeight: 900 }}>{week}</strong>
            {playoffRound ? ` - ${playoffRound}` : ''}
          </h2>
          <Bar
              width={800}
              height={500}
              layout="horizontal"
              margin={{ top: 26, right: 120, bottom: 26, left: 60 }}
              data={barData}
              indexBy="id"
              keys={['value']}
              colors={{ scheme: 'spectral' }}
              colorBy="indexValue"
              borderColor={{ from: 'color', modifiers: [['darker', 2.6]] }}
              enableGridX
              enableGridY={false}
              axisTop={{
                  format: '~s',
              }}
              axisBottom={{
                  format: '~s',
              }}
              axisLeft={null}
              padding={0.3}
              labelTextColor={{ from: 'color', modifiers: [['darker', 1.4]] }}
              isInteractive={false}
              barComponent={BarComponent}
              motionStiffness={170}
              motionDamping={26}
          />
      </>
  )
}

export default RaceChart;