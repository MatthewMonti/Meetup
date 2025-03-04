import React from 'react';
import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents'
import { getEvents, extractLocations } from './api';
import './App.css';
import { CityAlert, NumberAlert, EventAlert } from './components/Alert';

const App = () => {
  const [events, setEvents] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [currentNOE, setCurrentNOE] = useState('32');
  const [cityAlert, setCityAlert] = useState("");
  const [numberAlert, setNumberAlert] = useState("");
  const [eventAlert, setEventAlert] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const allEvents = await getEvents();
        const filteredEvents = currentCity === "See all cities"
          ? allEvents
          : allEvents.filter(event => event.location === currentCity);
  
        setEvents(filteredEvents.slice(0, currentNOE));
        setAllLocations(extractLocations(allEvents));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

        // Handler for when the user goes online
        const handleOnline = () => {
          setIsOnline(true);
          setEventAlert(""); // Clear offline message
          fetchMeetings(); // Refetch events when back online
        };
    
        // Handler for when the user goes offline
        const handleOffline = () => {
          setIsOnline(false);
          setEventAlert("Currently viewing Offline Database"); // Display offline message
        };
    
        // Add event listeners to detect online/offline status changes
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

    if(navigator.onLine) {
      setEventAlert("");
    }
  
    if (!navigator.onLine) {
      setEventAlert("Currently viewing Offline Database");
    }
  
    fetchMeetings();
  }, [currentCity, currentNOE, isOnline]);

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
      <br />
      <br />
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
      <EventList 
        events={events} 
        setEventAlert={setEventAlert}
      />
    </div>
  );
}

export default App;