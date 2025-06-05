import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

class EventGenresChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getData(props.events),
    };
  }

  genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
  COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  getData(events) {
    return this.genres.map((genre) => ({
      name: genre,
      value: events.filter((event) => event.summary.includes(genre)).length,
    }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.events !== this.props.events) {
      this.setState({ data: this.getData(this.props.events) });
    }
  }

  render() {
    return (
      <ResponsiveContainer width="50%" height={400}>
        <PieChart width={400} height={400}>
          <Pie data={this.state.data} labelLine={false} outerRadius={125} fill="#8884d8" dataKey="value">
            {this.state.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default EventGenresChart;


