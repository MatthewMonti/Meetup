import React from 'react';
import Event from "../components/Event";
import mockData from "../mock-data";
import { render, screen } from '@testing-library/react';
const event = mockData[0];


describe('<Event /> component', () => {
  let eventComponent;
  beforeEach(() => {
    eventComponent = render(<Event event={event}/>);
  });
  
  test('has an element with "list" role', () => {
    const eventList = eventComponent.getByRole("listitem");
    expect(eventList).toBeInTheDocument();
  });

  test('event information displays event title', () => {
    const eventSummary = eventComponent.queryByText(event.summary);
    expect(eventSummary).toBeInTheDocument();
  });

  test('event location is displayed', () => {
    const eventLocation = eventComponent.queryByText(event.location);
    expect(eventLocation).toBeInTheDocument();
  });

  test('event start time is displayed', () => {
    const eventStartTime = screen.queryByText(`${event.start.dateTime} ${event.start.timeZone}`);
    expect(eventStartTime).toBeInTheDocument();
  });
  
  test('event end time is displayed', () => {
    const eventEndTime =  screen.queryByText(`${event.end.dateTime} ${event.end.timeZone}`);
    expect(eventEndTime).toBeInTheDocument();
  });
});