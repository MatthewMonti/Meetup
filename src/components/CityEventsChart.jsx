import React, { PureComponent } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from 'recharts';

class CityEventsChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getData(props.events, props.allLocations),
    };
  }

  getData(events, allLocations) {
    return allLocations.map((location) => {
      const count = events.filter((event) => event.location === location).length;
      const city = location.split(/, | - /)[0];
      return { city, count };
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.events !== this.props.events) {
      this.setState({ data: this.getData(this.props.events, this.props.allLocations) });
    }
  }

  render() {
    return (
      <ResponsiveContainer width="50%" height={400}>
        <ScatterChart
          margin={{ top: 100, right: 50, bottom: 100, left: 40 }}
        >
          <CartesianGrid />
          <XAxis type="category" dataKey="city" name="City"
            angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }}
          >
            <Label value="Cities" offset={-70} position="insideBottom" />
          </XAxis>
          <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false}>
            <Label value="Number of Meetings" offset={-120} position="insideLeft" />
          </YAxis>
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="A meeting" data={this.state.data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
}

export default CityEventsChart;
