// src/__tests__/EventList.test.js
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';
import App from 'src/App.jsx'
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
    test('renders a list events when the app is mounted and rendered', async () => {
        render(<App />);
        
        await waitFor(() => {
            expect(screen.getByTestId('event-list')).toBeInTheDocument();
        });

        const eventListItems = screen.queryAllByRole('listitem');
        
        expect(eventListItems.length).toBe(32);
    });  
});
