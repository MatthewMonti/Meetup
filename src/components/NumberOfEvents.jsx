import React from 'react';
import '../App.css';
const NumberOfEvents = ({setCurrentNOE, currentNOE, setNumberAlert }) => {

    const handleInputChanged = (event) => {
        const value = event.target.value;

        const numericValue = Number(value);

        setCurrentNOE(value);

        // Validate the input
        if (isNaN(value)) {
            setNumberAlert('Enter a valid number');
        } else if (value < 1) {
            setNumberAlert('Number must be greater than 0');
        } else if (!Number.isInteger(value)) {
            setNumberAlert('Input must be a whole number')
        }
        else
        {
            setNumberAlert('');
            setCurrentNOE(value); 
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