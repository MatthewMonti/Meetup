import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, within, act } from '@testing-library/react';
import App from '../App.jsx'; // Adjust path based on your directory structure
import userEvent from '@testing-library/user-event';
import {getEvents} from '../api.js';
import React from 'react';
const feature = loadFeature('./src/features/listCount.feature');

defineFeature(feature, test => {

    test('When user has not specified a number, 32 events are shown by default.', ({ given, when, then }) => {

        given('user on main page', async () => {
            await act(async () => {
                render(<App />)
            });
        });

        when(/^number in event count textbox default set to (\d+)$/, (arg0) => {

        });

        then(/^the number of events displayed is exactly (\d+) events$/, (arg0) => {
            const eventNumberInput = screen.getByTestId('NumberOfEventsInput');
            expect(eventNumberInput).toHaveValue('32');
        });
    });

    test('User can change the number of events displayed', ({ given, when, then }) => {
        given('clicks on textbox with event number count', async () => {
            await act(async () => {
                render(<App />);
            });
        });

        let NumberEventsDOM;
        when('user changes the number of events', async () => {
            const eventNumberInput = screen.getByTestId('NumberOfEventsInput');
            const user = userEvent.setup();
            await user.clear(eventNumberInput); 
            await user.type(eventNumberInput, "10");
        });
        let numberOfEventsComponent;
        then('page displays number of events user prefers displayed', async () => {
            const EventListDOM = screen.getByTestId('event-list');
            const eventListItems = within(EventListDOM).getAllByRole('listitem');
            const allEvents = await getEvents();
            expect(eventListItems).toHaveLength(10);
        });
    });
});