import React from 'react';
import { useState } from "react";
import '../App.css'
const Button = ({ event }) => {
  const [details, setDetails] = useState(true);

  const toggleDetails = () => {
    setDetails((prevDetails) => !prevDetails);
  };

  return (
    <div className="eventButton" data-testid="Details" >
            {details ? null : <p className="eventDetails">{event.description}</p> }
           <button className="detailsButton" onClick={toggleDetails}>
        {details ? "show details" : "hide details"}
      </button>
    </div>
  );
};

export default Button;

