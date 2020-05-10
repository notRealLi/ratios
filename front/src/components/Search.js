import React, { useState } from "react";
import "./Search.css";

const Search = () => {
  const suggestions = [
    "Alligator",
    "Bask",
    "Crocodilian",
    "Death Roll",
    "Eggs",
    "Jaws",
    "Reptile",
    "Solitary",
    "Tail",
    "Wetlands",
  ];

  const [text, setText] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const onChange = (e) => {
    const input = e.target.value;
    setText(input);

    if (input != "") {
      setFilteredSuggestions(
        suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(input)
        )
      );
    } else {
      setFilteredSuggestions([]);
    }
  };

  return (
    <>
      <h3>Search for a stock</h3>
      <input type="text" value={text} onChange={onChange} />
      {filteredSuggestions.length > 0 && (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion) => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Search;
