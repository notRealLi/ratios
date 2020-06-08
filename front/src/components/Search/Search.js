import React, { useState, useContext } from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { GlobalContext } from "../../context/GlobalState";
import styles from "./Search.module.css";

const Search = () => {
  const { suggestions, searchSymbol, searchDataset } = useContext(
    GlobalContext
  );

  const [text, setText] = useState("");

  const onInputChange = (event, input) => {
    searchSymbol(input);
  };

  const onChange = (event, selection) => {
    if (!selection) return;
    searchDataset(selection.value);
    setText("");
  };

  const getOptionLabel = (option) => {
    if (!option) return "";

    return option.label;
  };

  return (
    <div className={styles.container}>
      <Autocomplete
        value={text}
        popupIcon={null}
        noOptionsText={"Type to search..."}
        options={suggestions}
        getOptionLabel={getOptionLabel}
        onInputChange={onInputChange}
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} label="Stock Symbol" margin="normal" />
        )}
      />
    </div>
  );
};

export default Search;
