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

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);
  //const [query, setQuery] = useState("")
  //console.log(events)
  
  useEffect(() => {
    setData(getData());
  }, [`${events}`]);
  console.log(events)
  
  const getData = () => {
    const data = allLocations.map((location) => {
      const count = events.filter((event) => event.location === location).length
      const city = location.split((/, | - /))[0]
      return { city, count };
    })
    return data;
  };

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
        <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} >
        <Label value="Number of Meetings" offset={-120} position="insideLeft" />
          </YAxis>
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default CityEventsChart;


