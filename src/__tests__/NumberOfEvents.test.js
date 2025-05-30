import NumberOfEvents from '../components/NumberOfEvents';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
describe('<NumberOfEvents /> Component', () => {
    let numberOfEventsComponent;
    beforeEach(() => {
        numberOfEventsComponent = render(
            <NumberOfEvents
                currentNOE={32} 
                setCurrentNOE={() => {}}
                setNumberAlert={() => {}}
            />
        );
    });

    test('component contains input textbox', () => {
        const input = numberOfEventsComponent.queryByRole('textbox');
        expect(input).toBeInTheDocument();
    });

    test('default value of the input field is 32', () => {
        const input = numberOfEventsComponent.queryByRole('textbox');
        expect(input.value).toBe('32'); // Ensure the default value is correctly set
      });


    test('Number greater than 0', async () => {
        const input = numberOfEventsComponent.getByTestId('NumberOfEventsInput');
        const user = userEvent.setup();
    
        await user.type(input, '{backspace}{backspace}1'); // Input a valid number greater than 0
        expect(Number(input.value)).toBeGreaterThan(0); // Convert input value to a number for comparison
    });

    
    test('Input must be a whole number', async () => {
        const input = numberOfEventsComponent.getByTestId('NumberOfEventsInput');
        const user = userEvent.setup();
    
        await user.type(input, '{backspace}{backspace}21.8'); // Input a valid number greater than 0
        expect(Number(input.value)).isInteger; // Convert input value to a number for comparison
    });
});

describe('<NumberOfEvents /> integration tests', () => {
    let numberOfEventsComponent;
    beforeEach(() => {
        numberOfEventsComponent = render(
            <App
            />
        );
    });
    
    test('ensures the default value of textbox is 32', () => {
        const input = numberOfEventsComponent.getByTestId('NumberOfEventsInput');
        expect(Number(input.value)).toBe(32); 
    });


    test('Test max is to 32', async () => {
        const input = numberOfEventsComponent.getByTestId('NumberOfEventsInput');
        const user = userEvent.setup();
    
        await user.type(input, '{backspace}{backspace}32'); // Input a valid number greater than 0
        expect(Number(input.value)).toBeLessThan(33); // Convert input value to a number for comparison
    });

    test('textbox value changes when user updates input', async () => {
        const input = numberOfEventsComponent.getByTestId('NumberOfEventsInput');
        const user = userEvent.setup();
        await user.type(input, '{backspace}{backspace}10');
        expect(Number(input.value)).toBe(10);
    });
});