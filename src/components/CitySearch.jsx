import React from 'react';
import { useState, useEffect, useRef } from "react";
import '../../src/App.css';

const CitySearch = ({ setCurrentCity, allLocations,  setCityAlert}) => {
  
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

    setQuery(value);
    setSuggestions(filteredLocations);



    if (value === '') {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true)
    }

    let infoText;
    if (filteredLocations.length === 0) {
      infoText = "Please try another city that is in database"
    } else {
      infoText = ""
    }
    setCityAlert(infoText);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false); // Hide suggestions
    setCurrentCity(value);
    setEventAlert("");
   // setCurrentNOE("10");
  };

  // Handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (SuggestionListRef.current && !SuggestionListRef.current.contains(event.target)) {
        setShowSuggestions(false); // Hide suggestions when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }), [`${allLocations}`];

  return (
    <div id="citySearch" data-testid="city-search">
        <h3>Choose your nearest city</h3>
      <input
        type="text"
        className="city"
        placeholder="Search City for meetings"
        value={query}
        onFocus={() => setShowSuggestions(true)}
            onChange={handleInputChanged}
            data-testid="search-input"
      />

      {showSuggestions && (
        <ul data-testid="CityList" className="suggestions" ref={SuggestionListRef}>
          <div className="listCities">
            {suggestions.map((suggestion, index) => (
              <li
                className="cityName"
                onClick={handleItemClicked}
                key={`${suggestion}-${index}`}
              >
                {suggestion}
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
