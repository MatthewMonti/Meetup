import React from 'react';
import { useState } from "react";
import '../App.css';
const NumberOfEvents = ({ currentNOE, setCurrentNOE, setNumberAlert }) => {
    const [number, setNumber] = useState(currentNOE);

    const handleInputChanged = (event) => {
        const value = event.target.value;

        // Convert value to a number if it's a valid numeric string
        const numericValue = Number(value);

        setNumber(value);

        // Validate the input
        if (isNaN(numericValue)) {
            setNumberAlert('Enter a valid number');
        } else if (numericValue < 1) {
            setNumberAlert('Number must be greater than 0');
        } else if (numericValue > 32) {
            setNumberAlert('Only a maximum of 32 is allowed');
        } else if (!Number.isInteger(numericValue)) {
            setNumberAlert('Input must be a whole number')
        }
        else
        {
            setNumberAlert('');
            setCurrentNOE(numericValue); // Update the main state only when input is valid
        }
    };

    return (
        <div id="numberSearch" data-testid="number-of-events">
            <h5>Number of Events:</h5>
                <input 
                    className="eventNumber"
                    type="text"
                    value={number}
                    onChange={handleInputChanged}
                    data-testid="NumberOfEventsInput"
                />
        </div>
    );
};

export default NumberOfEvents;