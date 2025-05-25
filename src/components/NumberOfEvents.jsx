import React from 'react';
import '../App.css';
const NumberOfEvents = ({setCurrentNOE, currentNOE, setNumberAlert }) => {

    const handleInputChanged = (event) => {
        const value = event.target.value;

        const numericValue = Number(value);

        // Validate the input
        if (isNaN(numericValue)) {
            setNumberAlert('Enter a valid number');
        } 
        else if (numericValue <= -1) {
            setNumberAlert('Number must be greater than  or equal to 0');
        } 
        else if (!Number.isInteger(numericValue)) {
            setNumberAlert('Input must be a whole number')
        }
        else
        {
            setNumberAlert('');
            setCurrentNOE(numericValue); 
        }
    };

    return (
        <div id="numberSearch" data-testid="number-of-events">
            <h5>Number of Events:</h5>
                <input 
                    className="eventNumber"
                    type="number"
                    value={currentNOE}
                    role="textbox"
                    onChange={handleInputChanged}
                    data-testid="NumberOfEventsInput"
                />
        </div>
    );
};

export default NumberOfEvents;