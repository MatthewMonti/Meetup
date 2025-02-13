// src/__tests__/CitySearch.test.js

import React from 'react';
import { render, within, waitFor, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';
import App from '../App';
import '../calendar.png'
describe('<CitySearch /> component', ()  => {
  let allLocations;
  let citySearchComponent;

  // Fetch data before running any tests
  beforeAll(async () => {
    const allEvents = await getEvents(); // Fetch all events
    allLocations = extractLocations(allEvents); // Extract locations
  });

  beforeEach(() => {
    citySearchComponent = render(
      <CitySearch 
        allLocations={allLocations} 
        setCurrentCity={() => {}}
        setInfoAlert={() => { }}
      />
    );
  });


  test('shows only "See all cities" when typing a city not in the list', async () => {
    // Simulate typing a city that does not exist in the list
    const user = userEvent.setup();
    const cityTextBox = screen.getByTestId('search-input');
    await user.type(cityTextBox, 'Paris, France');
  
    // Wait for the suggestions list to update
    const suggestionItems = await screen.findAllByRole('listitem');
    
    // Assert that the suggestions list contains only one item: "See all cities"
    expect(suggestionItems).toHaveLength(1); // Only one suggestion item should be shown
    expect(suggestionItems[0].textContent).toBe('See all cities'); // It should be "See all cities"
  });

  test('renders text input', () => {
    const cityTextBox = citySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    const suggestionList = citySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('clicking textbox renders a list of suggestions', async () => {
    const user = userEvent.setup();
    const cityTextBox = citySearchComponent.queryByRole('textbox');
    await user.click(cityTextBox);
    const suggestionList = citySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();

    // User types "Berlin" in city textbox
    const cityTextBox = citySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    // Filter allLocations to locations matching "Berlin"
    const suggestions = allLocations ? allLocations.filter((location) =>
      location.toUpperCase().includes(cityTextBox.value.toUpperCase())) : [];

    // Get all <li> elements inside the suggestion list
    const suggestionListItems = citySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test('renders the suggestion list in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents(); 
    const allLocations = extractLocations(allEvents);

    const cityTextBox = citySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    // The suggestion's textContent looks like this: "Berlin, Germany"
    const BerlinGermanySuggestion = citySearchComponent.queryAllByRole('listitem')[0];
    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });

  test('hides suggestions list when input is cleared', async () => {
    const user = userEvent.setup();
    const cityTextBox = citySearchComponent.queryByRole('textbox');
    
    // Type 'Berlin' into the input field
    await user.type(cityTextBox, 'Berlin');
    
    // Ensure the suggestions list is visible after typing
    const suggestionList = await screen.findByRole('list');
    expect(suggestionList).toBeInTheDocument();
  
    // Clear the input field
    await user.clear(cityTextBox);
    
    // Wait for the suggestions list to be removed
    await waitFor(() => {
      const suggestionList = citySearchComponent.queryByRole('list');
      expect(suggestionList).not.toBeVisible;
    });
  });

});

describe('<CitySearch /> integration', () => {
  let allLocations;
  let citySearchComponent;

  // Fetch data before running any tests
  beforeAll(async () => {
    const allEvents = await getEvents(); // Fetch all events
    allLocations = extractLocations(allEvents); // Extract locations
  });

  beforeEach(() => {
    citySearchComponent = render(
      <CitySearch 
        allLocations={allLocations} 
      />
    );
  });
  
  test('renders suggestions list when the app is rendered.', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const CitySearchDOM = within(AppDOM).queryByTestId('city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    await waitFor(() => {
      const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
  });
});