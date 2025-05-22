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
    setQuery(value); // Always reflect what's typed
  
    const trimmedValue = value.trim();
  
    // Filter suggestions based on input
        const filteredSuggestions = allLocations.filter((location) =>
        location.toLowerCase().includes(trimmedValue.toLowerCase())
    );
  
    if (filteredSuggestions.length === 0) {
      setSuggestions([]);
      setCityAlert("We can not find the city you are looking for. Please try another city.");
    } else {
      setSuggestions(filteredSuggestions);
      setCityAlert(""); 
    }

    setShowSuggestions(true);
  };

  
  

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false); // Hide suggestions
    setCurrentCity(value);
    setEventAlert("");
  };

  // Handle clicking outside the dropdown
  useEffect(() => {
    setSuggestions(allLocations)
    const handleClickOutside = (event) => {
      if (SuggestionListRef.current && !SuggestionListRef.current.contains(event.target)) {
        setShowSuggestions(false); // Hide suggestions when clicking outside
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
        type="category"
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
