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
  }, [events]);
  
const getData = () => {
  return allLocations.map((location) => {
    const count = events.filter(event => event.location === location).length;
    return { city: location, count };
  }).filter(d => d.count > 0);
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
        <XAxis type="category" dataKey="city" name="City" allowDuplicatedCategory={false}
          angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }} >
        <Label value="Cities" offset={-70} position="insideBottom" />
          </XAxis>
        <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} >
        <Label value="Number of Meetings" offset={-120} position="insideLeft" />
          </YAxis>
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Coding Event" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default CityEventsChart;
