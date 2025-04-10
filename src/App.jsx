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
  const [currentCity, setCurrentCity] = useState("");
  const [currentNOE, setCurrentNOE] = useState('32');
  const [cityAlert, setCityAlert] = useState("");
  const [numberAlert, setNumberAlert] = useState("");
  const [eventAlert, setEventAlert] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
 // const [defaultFiltered, setDefaultFiltered] = useState("")

  const updateOnlineStatus = () => {
    const online = navigator.onLine;
    setIsOnline(online);
    setEventAlert(online ? "" : "Currently viewing Offline Database");
  };
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const allEvents = await getEvents();
       // const defaultFiltered= ? setCurrentCity("See all cities") : setCurrentCity(currentCity)
        //const defaultFiltered = currentCity === "" ? setCurrentCity("See all cities") : setCurrentCity(currentCity);
        // better reability and code is used better 
        const defaultCity = currentCity === "" ? "See all cities" :`${currentCity}`;
        setCurrentCity(defaultCity);
        const filteredEvents = currentCity === "See all cities"
          ? allEvents
          : allEvents.filter(event => event.location === currentCity);

        
        setEvents(filteredEvents.slice(0, currentNOE));

        setAllLocations(extractLocations(allEvents));

      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    updateOnlineStatus();
    fetchMeetings();
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
  
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, [currentCity, currentNOE]);

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
        currentCity={currentCity}
        setCurrentNOE={setCurrentNOE}
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
      <CityEventsChart 
      allLocations={allLocations} 
      events={events} 
      />
      <EventGenresChart
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