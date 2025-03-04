// src/components/Alert.js
import React from 'react';
import { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
  }
///Similarities between the alerts summaries less redundant code
  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: this.color,
      textAlign: "center",
      fontSize: "12px",
      margin: "10px 0",
      padding: "10px"
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class CityAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(30, 0, 249)'; // Valid blue shade
    this.bgColor = 'rgb(216, 214, 253)';  /* A light lavender shade */
  }
}

class NumberAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(255, 0, 0)'; // blue
    this.bgColor = 'rgb(255, 220, 220)'; // light blue
  }
}

class EventAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(255, 112, 29)'; // A warm light orange
    this.bgColor ='rgb(255, 228, 145)';  /* Light orange/yellow */
  }
}
export { CityAlert, NumberAlert, EventAlert};