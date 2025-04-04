// src/components/EventList.js
import React from 'react';
import Event from "./Event";
import '../../src/App.css';
const EventList = ({ events }) => {
 return (
   <ul className="event-list" data-testid="event-list">
     {events ?
       events.map(event => <Event key={event.id} event={event} />) :
       null}
   </ul>
 );
}

export default EventList;

