import React from 'react';
import { useState, useEffect, useRef } from "react";
import '../../src/App.css';

const CitySearch = ({ setCurrentCity, allLocations, currentCity, setCurrentNOE, currentNOE, setCityAlert}) => {
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState(allLocations);
  const SuggestionListRef = useRef(null);
  const [eventAlert, setEventAlert] = useState("");
  const [query, setQuery] = useState("");


  const handleInputChanged = (event) => {
    const value = event.target.value;

   const filteredLocations = allLocations ? allLocations.filter((location) => {
     return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
   }) : [];

    if (value === "") {
    setQuery("");                 // Clear the input box
    setSuggestions(allLocations); // Reset suggestions to all
    setCityAlert("")
    setShowSuggestions(false)
    setCurrentCity("See all cities"); // Tell parent to show everythin
  
  } else if (value){
    setQuery(value);
    setSuggestions([value]);
    setCurrentCity(value);
    setCityAlert("");
    setCurrentNOE(1);
     setShowSuggestions(false);
  }
   else if (!value){
    setQuery(value);
    setSuggestions([value]);
    setCurrentCity(value);
    setCityAlert("");
    setCurrentNOE(0)
    setShowSuggestions(false);
   }


    
    setQuery(value);
    setSuggestions(filteredLocations)

   // let cityQuery;
  

   let infoText;
   if (filteredLocations.length === 0) {
     infoText = "We can not find the city you are looking for. Please try another city"
     setCurrentNOE(0)
   }
   else {
     infoText = ""
   }
   setCityAlert(infoText);
  };

const handleItemClicked = async (event) => {
  const value = event.target.textContent;

  if (value === "See all cities") {
    setQuery("");
    setSuggestions(allLocations);
    setCurrentCity("See all cities");
    setCityAlert("");
    setCurrentNOE(0); // Reset to 0 first
    await new Promise(resolve => setTimeout(resolve, 0)); // Yield to event loop
    setCurrentNOE(32); // Then set to full count
    setShowSuggestions(false);
  } else if (value) {
    setQuery(value);
    setSuggestions([value]);
    setCurrentCity(value);
    setCityAlert("");
    setCurrentNOE(0); // Reset to 0 first
     await new Promise(resolve => setTimeout(resolve, 0)); // Yield to event loop
    setCurrentNOE(32); // Then set to full count
    setShowSuggestions(false);
  }
};

  useEffect(() => {
    setSuggestions(allLocations)
    const handleClickOutside = (event) => {
      if (SuggestionListRef.current && !SuggestionListRef.current.contains(event.target)) {
        setShowSuggestions(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [`${allLocations}`])

  return (
    <div id="city-search">
        <h3>Choose your nearest city</h3>
      <input
        type="text"
        className="city"
        placeholder="Search City for meetings"
        value={query}


        onFocus={() => {
          if (query.trim() === "") {
            setSuggestions(allLocations);
          }
          setShowSuggestions(true);
        }}
        onChange={handleInputChanged}
        data-testid="search-input"
        />
      {showSuggestions && (
        <ul id="suggestions" className="suggestions" ref={SuggestionListRef}>
          <div className="listCities">
            {suggestions.map((suggestion) => (
              <li
                className="cityName"
                onClick={handleItemClicked}
                key={suggestion}>{suggestion}
              </li>
            ))}
            <li
              className="cityName"
              key="See all cities"
              onClick={handleItemClicked}
            >
              <b>See all cities</b>
            </li>
          </div>
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
