import React from 'react';
import Button from './Button'
import '../../src/App.css';

// src/components/Event.js
const Event = ({event}) => {
    return (
    <li className="event">
      <h3>{event.summary}</h3>
      <p className="eventAttribute">{event.start.dateTime} {event.end.timeZone}</p>
      <p className="eventAttribute">{event.end.dateTime} {event.end.timeZone}</p>
      <p className="eventAttribute">{event.location}</p>
      <Button event={event} />
    </li>
    );
  }
  
  export default Event;