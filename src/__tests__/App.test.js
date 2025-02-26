import React from 'react';
import { render, within, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {getEvents} from '../api.js';
import App from '../App.jsx';

describe('<App /> component unit tests', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<App />);  // Don't assign to AppDOM yet
    });
  });

  test('renders list of events', async () => {
    const eventList = screen.queryByTestId('event-list');  
    expect(eventList).toBeInTheDocument();
  });

  test('renders CitySearch', async () => {
    const citySearch = screen.queryByTestId('city-search');  
    expect(citySearch).toBeInTheDocument();
  });
});


describe('<App /> integration tests', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<App />);  // Don't assign to AppDOM yet
    });
  });

  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
  
    // Type "London" into the city search input
    const citySearchDOM = screen.queryByTestId('city-search');
    const citySearchInput = within(citySearchDOM).queryByRole('textbox');
    await user.type(citySearchInput, "London");
  
    // Click on the London suggestion
    const londonSuggestionItem = within(citySearchDOM).queryByText('London, UK');
    await user.click(londonSuggestionItem);
  
    // Wait for events to load and find all list items (events)
    const eventListDOM = screen.queryByTestId('event-list');
  
    // Use `findAllByRole` to wait for async rendering
    const allRenderedEventItems = await within(eventListDOM).findAllByRole('listitem');   
  
    // Get all events and filter for London events
    const allEvents = await getEvents();
    const londonEvents = allEvents.filter(
      event => event.location === 'London, UK'
    );
  
    // Check that the number of rendered events matches the London events
    expect(allRenderedEventItems.length).toBe(londonEvents.length);
  });

});