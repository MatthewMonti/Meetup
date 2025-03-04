import React from 'react';
import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents'
import { getEvents, extractLocations } from './api';
import './App.css';
import {CityAlert, NumberAlert, EventAlert } from './components/Alert'
const App = () => {
  const [events, setEvents] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [currentNOE, setCurrentNOE] = useState('32');
  const [cityAlert, setCityAlert] = useState("");
  const [numberAlert, setNumberAlert] = useState("");
  const [eventAlert, setEventAlert] = useState("");




  // Trigger fetching when the city changes
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const allEvents = await getEvents();
        const filteredEvents = currentCity === "See all cities"
          ? allEvents
          : allEvents.filter(event => event.location === currentCity);
  
        setEvents(filteredEvents.slice(0, Number(currentNOE))); // Ensure currentNOE is a number
        setAllLocations(extractLocations(allEvents));
  
        // If online, clear any previous offline alert
        if (navigator.onLine) {
          setEventAlert("");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEventAlert("Error fetching events. Please try again later.");
      }
    };
  
    // Handle offline state
    if (!navigator.onLine) {
      setEventAlert("Currently viewing Offline Database");
    } else {
      fetchMeetings();
    }
  }, [currentCity, currentNOE, navigator.onLine]); // Now reacts to online/offline status as well

  return (
    <div className="App">
      <h1 data-testid="outside-element">Meetup App</h1>
      <img className="time" alt="meet-logo"src='/calendar.png'></img>
      <div className="cityError-Message">
        {eventAlert.length ? <EventAlert text={eventAlert}/> : null}
      </div>
      <CitySearch 
        //DATA FLOW REACT TOP TO DOWN AND UPDATE BY USER INTERACTION
        allLocations={allLocations} 
        setCurrentCity={setCurrentCity} 
        setCityAlert={setCityAlert} 
        />
      <br />
      <br />
      <div className="cityError-Message">
        {cityAlert.length ? <CityAlert text={cityAlert}/> : null}
      </div>
      <NumberOfEvents 
        //DATA FLOW REACT TOP TO DOWN AND UPDATE BY USER INTERACTION
        currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE}
        setNumberAlert={setNumberAlert}
        />
      <div className="cityNumber-Message">
        {numberAlert ? <NumberAlert text={numberAlert}/> : null}
      </div>
      <EventList 
      events={events} 
      setEventAlert={setEventAlert}
      />
    </div>
  );
}

export default App;