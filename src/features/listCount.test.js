import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, within, act } from '@testing-library/react';
import App from '../App.jsx'; // Adjust path based on your directory structure
import userEvent from '@testing-library/user-event';
import {getEvents} from '../api.js';
import React from 'react';
const feature = loadFeature('./src/features/listCount.feature');

defineFeature(feature, test => {

    test('When user has not specified a number, 32 events are shown by default.', ({ given, when, then }) => {
        let AppComponent;
        given('user on main page', async () => {
            await act(async () => {
                AppComponent = render(<App />)
            });
        });

        when(/^number in event count textbox default set to (\d+)$/, (arg0) => {
            const eventNumberInput = screen.getByTestId('NumberOfEventsInput');
            expect(eventNumberInput).value ="32";

        });

        then(/^the number of events displayed is exactly (\d+) events$/, async (arg0) => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            const eventListItems = within(EventListDOM).getAllByRole('listitem');
            const allEvents = await getEvents();
            expect(eventListItems).toHaveLength(32);

            
        });
    });

    test('User can change the number of events displayed', ({ given, when, then }) => {
    let AppComponent;
    given('clicks on textbox with event number count', async () => {
      await act(async () => {
        AppComponent = render(<App />);
      });
    });

    when('user changes the number of events', async () => {
      const eventNumberInput = screen.getByTestId('NumberOfEventsInput');
      const user = userEvent.setup();
      await user.clear(eventNumberInput);
      await user.type(eventNumberInput, "10");
      expect(eventNumberInput).toHaveValue(10); // Optional: verify input change
    });

    then('page displays number of events user prefers displayed', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      const eventListItems = await within(EventListDOM).findAllByRole('listitem');
      expect(eventListItems.length).toBe(10);
    });
  });
});