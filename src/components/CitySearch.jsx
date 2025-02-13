import React from 'react';
import { useState, useEffect, useRef } from "react";
import '../../App.css';

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState(allLocations);
  const SuggestionListRef = useRef(null);

  const handleInputChanged = (event) => {
    const city = event.target.value.trim();  // Ensure spaces are treated as empty
    
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(city.toUpperCase()) > -1;
    }) : [];

    setQuery(city);
    setSuggestions(filteredLocations);

    if (city === '') {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true)
    }

    let infoText;
    if (filteredLocations.length === 0) {
      infoText = "We can not find the city you are looking for. Please try another city"
    } else {
      infoText = ""
    }
    setInfoAlert(infoText);

  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false); // Hide suggestions
    setCurrentCity(value);
    setInfoAlert("")
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
  }, []);

  return (
    <div id="citySearch" data-testid="city-search">
        <h3>Choose your nearest city</h3>
      <input
        type="text"
        className="city"
        value={query}
        onFocus={() => {
          // Show all suggestions when input is focused and the query is empty
          if (query.trim() === "") {
            setSuggestions(allLocations);
            setShowSuggestions(true);
          }
        }}
        onChange={handleInputChanged}
        data-testid="search-input"
      />

      {showSuggestions && (
        <ul className="suggestions" ref={SuggestionListRef}>
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
