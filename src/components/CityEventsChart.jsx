// src/components/CityEventsChart.jsx

import React, { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from 'recharts';   

const CityEventsChart = ( {allLocations, events}  ) => {
  const [data, setData] = useState([]);
  const getData = () => {
    const data = allLocations.map((location) => {
      const countnumber = events.filter((event) => event.location === location).length
      const city = location.split((/, | - /))[0]
      return { city, countnumber };
    })
    return data;
  };
  useEffect(() => {
    setData(getData());
  }, [`${events}`]);




  return (
    <ResponsiveContainer width="50%" height={400}>
      <ScatterChart
        margin={{
          top: 100,
          right: 50,
          bottom: 100,
          left: 40,
        }}
      >
        <CartesianGrid />
        <XAxis type="category" dataKey="city" name="City"
          angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }} >
        <Label value="Cities" offset={-70} position="insideBottom" />
          </XAxis>
        <YAxis type="number" dataKey="countnumber" name="Meetings" allowDecimals={false} >
        <Label value="Number of Meetings" offset={-120} position="insideLeft" />
          </YAxis>
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default CityEventsChart;


