import React from 'react';
import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents'
import { getEvents, extractLocations } from './api';
import './App.css';
import { CityAlert, NumberAlert, EventAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
const App = () => {
  const [events, setEvents] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [currentNOE, setCurrentNOE] = useState(32);
  const [cityAlert, setCityAlert] = useState("");
  const [numberAlert, setNumberAlert] = useState("");
  const [eventAlert, setEventAlert] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const updateOnlineStatus = () => {
    const online = navigator.onLine;
    setIsOnline(online);
    setEventAlert(online ? "" : "Currently viewing Offline Database");
  };
  useEffect(() => {


    updateOnlineStatus();
    fetchData();
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
  
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, [`${currentCity}`, `${currentNOE}`]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  return (
    <div className="App">
      <h1 data-testid="outside-element">Meetup App</h1>
      <img className="time" alt="meet-logo" src='/calendar.png'></img>
      <div className="cityError-Message">
        {eventAlert.length ? <EventAlert text={eventAlert}/> : null}
      </div>
      <CitySearch 
        allLocations={allLocations} 
        setCurrentCity={setCurrentCity} 
        setCityAlert={setCityAlert} 
      />

      <div className="cityError-Message">
        {cityAlert.length ? <CityAlert text={cityAlert}/> : null}
      </div>
      <NumberOfEvents 
        currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE}
        setNumberAlert={setNumberAlert}
      />
      <div className="cityNumber-Message">
        {numberAlert ? <NumberAlert text={numberAlert}/> : null}
      </div>
      <div className="charts-container">
      <EventGenresChart
      events={events}
      />
      <CityEventsChart 
      allLocations={allLocations} 
      events={events} 
      />
      </div>
      <EventList 
        events={events} 
        setEventAlert={setEventAlert}
      />
    </div>
  );
}

export default App;