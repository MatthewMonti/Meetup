import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState} from 'react';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular' ];
  const COLORS = ['#0088FE','#00C49F','#FFBB28','#FF8042','#8884d8'];
  const getData = () => {
    const data = genres.map((genre) => {
      const filteredEvents = events.filter(event => event.summary.includes(genre));   
      return {
        name: genre,
        value: filteredEvents.length
      }
    })
    return data;
  };
  useEffect(() => {
    setData(getData());
    }, [`${events}`]);

  return (
    <ResponsiveContainer width="50%" height={400}>
      <PieChart width={400} height ={400} >
        <Pie
            data={data}
            labelLine={false}
            outerRadius={125}
            fill="#8884d8"
            dataKey="value"
            label="name"
        >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        <Legend verticalAlign="bottom" height={36}/>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenresChart;



