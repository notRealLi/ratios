import React, { useState, useContext } from "react";
import Select, { components } from "react-select";
import { GlobalContext } from "../context/GlobalState";
import "./Search.css";

const Search = () => {
  const { suggestions, searchSymbol } = useContext(GlobalContext);
  const [stock, setStock] = useState("");
  const [text, setText] = useState("");

  const onInputChange = (input) => {
    setText(input);
    searchSymbol(input);
  };

  return (
    <>
      <h3>Search for a stock</h3>
      {stock}
      <Select
        noOptionsMessage={() => "Type to search symbols"}
        onInputChange={onInputChange}
        onChange={(e) => {
          setStock(e.value);
          setText("");
        }}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        options={suggestions}
      />
    </>
  );
};

export default Search;
