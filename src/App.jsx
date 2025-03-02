import React from 'react';
import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents'
import { getEvents, extractLocations } from './api';
import './App.css';
import { InfoAlert, NumberAlert } from './components/Alert'
const App = () => {
  const [events, setEvents] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [currentNOE, setCurrentNOE] = useState('32');
  const [errorAlert, setErrorAlert] = useState("");
  const [infoAlert, setInfoAlert] = useState("")

  // Trigger fetching when the city changes
  useEffect(() => {
      // Fetch meetings/events based on the current city
  const fetchMeetings = async () => {
    try {
      const allEvents = await getEvents();
      const filteredEvents = currentCity === "See all cities"
        ? allEvents
        : allEvents.filter(event => event.location === currentCity);
      setEvents(filteredEvents.slice(0, currentNOE));
      setAllLocations(extractLocations(allEvents)); // Extract unique locations
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
    fetchMeetings();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <h1 data-testid="outside-element">Meetup App</h1>
      <img className="time" alt="meet-logo"src='/calendar.png'></img>
      <div className="cityError-Message">
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
      </div>
      <CitySearch 
        //DATA FLOW REACT TOP TO DOWN AND UPDATE BY USER INTERACTION
        allLocations={allLocations} 
        setCurrentCity={setCurrentCity} 
        setInfoAlert={setInfoAlert} 
        />
      <NumberOfEvents 
        //DATA FLOW REACT TOP TO DOWN AND UPDATE BY USER INTERACTION
        currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert} 
        />
      <div className="cityNumber-Message">
        {errorAlert ? <NumberAlert text={errorAlert}/> : null}
      </div>
      <EventList events={events} />
    </div>
  );
}

export default App;