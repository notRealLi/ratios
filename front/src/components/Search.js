import React, { useState, useContext } from "react";
import Select, { components } from "react-select";
import { GlobalContext } from "../context/GlobalState";

const Search = () => {
  const { suggestions, searchSymbol, searchDataset } = useContext(
    GlobalContext
  );
  const [stock, setStock] = useState(null);
  const [text, setText] = useState("");

  const onInputChange = (input) => {
    searchSymbol(input);
  };

  const onChange = (selection) => {
    setStock(selection.value);
    searchDataset(selection.value);
    setText("");
  };

  return (
    <>
      <h3>Search for a stock</h3>
      <Select
        value={text}
        noOptionsMessage={() => "Type to search symbols"}
        onInputChange={onInputChange}
        onChange={onChange}
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
