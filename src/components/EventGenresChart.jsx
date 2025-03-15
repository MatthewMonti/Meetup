import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { useEffect, useState} from 'react';

const EventGenresChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS' ];
  const colors = ['#0088FE','#00C49F','#FFBB28','#FF8042','#8884d8'];
  useEffect(() => {
    setData(getData());
  }, [`${events}`, `${allLocations}`, `${genres}`, `${colors}`]);


  const getData = () => {
    const data = events.map((summary) => {
      const countnumber = events.filter((event) => events.summary === summary).length
      const genre = summary.split((/, | - /))[0]
      return { countnumber, genre };
    })
    return data;
  };

  return (
    <ResponsiveContainer width="50%" height={400}>
      <PieChart width={400} height ={400}>
        <Pie 
            data="data" 
            cx="50%" 
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
        >
            {events.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenresChart;


