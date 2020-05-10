import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import "./Search.css";

const Search = () => {
  const { suggestions, searchSymbol } = useContext(GlobalContext);

  const [text, setText] = useState("");

  const onChange = (e) => {
    const input = e.target.value;
    setText(input);

    searchSymbol(input);
  };

  console.log(suggestions);

  return (
    <>
      <h3>Search for a stock</h3>
      <input type="text" value={text} onChange={onChange} />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Search;
