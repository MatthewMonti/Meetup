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

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(30, 0, 249)'; // Valid blue shade
    this.bgColor = 'rgb(220, 220, 255)'; // Light blue
  }
}

class NumberAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(255, 18, 17)'  /* Bright red */
    this.bgColor = 'rgb(255, 220, 220)'; // light blue
  }
}

export { InfoAlert, NumberAlert};