import React, { useState, useContext } from "react";
import { TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { GlobalContext } from "../../context/GlobalState";
import styles from "./Search.module.css";

const Search = () => {
  const { suggestions, searchSymbol, searchStock, error } = useContext(
    GlobalContext
  );

  const [text, setText] = useState("");
  const [autoKey, setAutoKey] = useState(true);

  const onInputChange = (event, input) => {
    if (!input || input.length < 2) return;
    console.log("input change");
    searchSymbol(input);
  };

  const onChange = (event, selection) => {
    setAutoKey(!autoKey);
    if (!selection) return;
    console.log("onchange");
    searchStock(selection.value);
    //searchNews(selection.value);
    setText("");
  };

  const getOptionLabel = (option) => {
    if (!option) return "";
    return option.label;
  };

  return (
    <div className={styles.container}>
      <Autocomplete
        key={autoKey}
        value={text}
        popupIcon={null}
        noOptionsText={"Type to search..."}
        options={suggestions}
        getOptionLabel={getOptionLabel}
        onInputChange={onInputChange}
        onChange={onChange}
        clearOnBlur={true}
        renderInput={(params) => (
          <TextField {...params} label="Stock Symbol" margin="normal" />
        )}
      />
      {error && error.type === "stock" && (
        <Typography color="secondary" variant="p">
          API limit reached. Please try again in a minute.
        </Typography>
      )}
    </div>
  );
};

export default Search;
