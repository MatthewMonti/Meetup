// src/__tests__/CitySearch.test.js

import React from 'react';
import { render, within, waitFor, fireEvent, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import {setCityAlert} from '../App.jsx'
import { extractLocations, getEvents } from '../api.js';
import App from '../App.jsx';
import EventList from '../components/EventList';

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
        setCityAlert={() => {}}
      />
    );
  });


  test('shows only "See all cities" when typing a city not in the list', async () => {
    // Simulate typing a city that does not exist in the list
    const user = userEvent.setup();
    const cityTextBox = citySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Paris, France');
    // Learned to keep await as this asynchronous function 
    //needed for test to work
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
        // Learned to keep await as this asynchronous function 
    //needed for test to work
    const suggestionList = citySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
  //  const allEvents = await getEvents();
   //const allLocations = extractLocations(allEvents);
    //citySearchComponent.rerender(<CitySearch allLocations={allLocations}   setCityAlert={() => {}} />);


    // user types "Berlin" in city textbox
    const cityTextBox = citySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");


    // filter allLocations to locations matching "Berlin"
    const suggestions = allLocations? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }): [];


    // get all <li> elements inside the suggestion list
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
    // Learned to keep await as this asynchronous function 
    //needed for test to work
    // The suggestion's textContent looks like this: "Berlin, Germany"
    const BerlinGermanySuggestion = citySearchComponent.queryAllByRole('listitem')[0];
    await user.click(BerlinGermanySuggestion);
    // Learned to keep await as this asynchronous function 
    //needed for test to work
    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });

  test('hides suggestions list when input is cleared', async () => {
    const user = userEvent.setup();
    const cityTextBox = citySearchComponent.queryByRole('textbox');
    
    // Type 'Berlin' into the input field
    await user.type(cityTextBox, 'Berlin');
        // Learned to keep await as this asynchronous function 
    //needed for test to work
    // Ensure the suggestions list is visible after typing
    const suggestionList = await screen.findByRole('list');
    expect(suggestionList).toBeInTheDocument();
  
    // Clear the input field
    await user.clear(cityTextBox);
        // Learned to keep await as this asynchronous function 
    //needed for test to work
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
  let eventListComponent;

  // Fetch data before running any tests
  beforeAll(async () => {
    const allEvents = await getEvents(); // Fetch all events
    const allLocations = extractLocations(allEvents); // Extract locations
  });

  beforeEach(() => {
    citySearchComponent = render(
      <App
      />
    );
  });
  
  test('renders suggestions list when the app is rendered.', async () => {
    const user = userEvent.setup();
    const AppDOM = citySearchComponent.container.firstChild;
    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox);
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    //Absolutely, waitFor is a valuable tool in your testing arsenal. Here’s why it’s beneficial:
    //Asynchronous Nature of React: React updates the DOM asynchronously. waitFor helps ensure that your assertions are only checked after the DOM updates have completed.
    //Flaky Tests: By not using waitFor, your tests can become flaky, meaning they may pass sometimes and fail other times depending on how fast or slow the DOM updates.
   // Network Requests and Side Effects: If your component makes network requests or has other side effects that affect the DOM, waitFor ensures you’re waiting for these to complete before making assertions.
    //Consistency: waitFor keeps your tests consistent. Without it, you may be making assumptions about timing that don’t hold up in different environments or slower CI pipelines.
    await waitFor(() => {
      const suggestionItems = within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionItems.length).toBe(allLocations.length + 1);
    });
  });

  test("hide list clicking outside element", async () => {

    const user = userEvent.setup();
    const AppDOM = citySearchComponent.container.firstChild;
    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox);
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents); 
    // Ensure the list is initially visible
    expect(AppDOM.querySelector("#suggestions")).toBeInTheDocument();

    // Click outside (on the <h1>)
    await user.click(screen.getByRole("heading", { level: 1 }));

    // The list should disappear
    expect(AppDOM.querySelector("#suggestions")).not.toBeInTheDocument();
  });
});
