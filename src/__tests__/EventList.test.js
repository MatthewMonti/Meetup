// src/__tests__/EventList.test.js
import React from 'react';
import { render, waitFor, within, screen } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

import App from '../App'
describe('<EventList /> component', () => {
   let eventListComponent;
 beforeEach(() => {
   eventListComponent = render(<EventList />);
 })

  test('has an element with "list" role', () => {
    expect(eventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    const allEvents = await getEvents(); 
    eventListComponent.rerender(<EventList events={allEvents} />);
    expect(eventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });

});

describe('<EventList /> integration', () => {

  let appComponent;
 beforeEach(() => {
   appComponent = render(<App />);
 })

   test('renders a list of 32 events when the app is mounted and rendered', async () => {
   const AppDOM = appComponent.container.firstChild;
   const EventListDOM = AppDOM.querySelector('#event-list');
   await waitFor(() => {
     const EventListItems = within(EventListDOM).queryAllByRole('listitem');
     expect(EventListItems.length).toBe(32);
   });
 });
test('renders a list of events on mount', async () => {
  const AppDOM = appComponent.container.firstChild;
  const EventListDOM = AppDOM.querySelector('#event-list');

  await waitFor(() => {
    const EventList = within(AppDOM).queryByRole('list');
    expect(EventList).toBeInTheDocument();
  });

  const eventListItems = screen.queryAllByRole('listitem');
  expect(eventListItems.length).toBeGreaterThan(0);
});  
});
