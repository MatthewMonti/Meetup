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

  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  const getData = () => {
    const data = allLocations.map((location) => {
      const count = events.filter((event) => event.location === location).length
      const city = location.split(', ')[0]
      return { city, count };
    })
    return data;
  };

  return (
    <ResponsiveContainer width="50%" height={400}>
      <ScatterChart
        margin={{
          top: 5,
          right: 5,
          bottom: 20,
          left: 120,
        }}
      >
        <CartesianGrid />
        <XAxis type="category" dataKey="city" name="City">
        <Label value="Location of Meetings" offset={-15} position="insideBottom" />
          </XAxis>
        <YAxis value="number of meetings" type="number" dataKey="count" name="Number of events" allowDecimals={false} >
        <Label value="Number of Meetings" offset={-110} position="insideLeft" />
          </YAxis>
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default CityEventsChart;


