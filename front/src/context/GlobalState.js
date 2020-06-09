import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
  selectedStock: null,
  suggestions: [],
  error: null,
  loading: true,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // actions
  async function searchSymbol(text) {
    try {
      // fetch an api key
      const {
        data: { data, size },
      } = await axios.get("/api/v1/stocks/keys");
      const key = data[Math.floor(Math.random(size))];
      let payload = [];
      text = text.trim();

      if (text !== "") {
        const {
          data: { bestMatches },
        } = await axios.get(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${text}&apikey=${key}`
        );

        if (bestMatches)
          payload = bestMatches.map((item) => ({
            value: item,
            label: item["1. symbol"],
          }));
      }

      dispatch({
        type: "SEARCH_SYMBOL",
        payload,
      });
    } catch (error) {
      dispatch({
        type: "STOCK_ERROR",
        payload: error,
      });
    }
  }

  async function searchStock(stock) {
    try {
      const {
        data: { data, size },
      } = await axios.get("/api/v1/stocks/keys");
      const key = data[Math.floor(Math.random(size))];
      let payload = null;
      const text = stock["1. symbol"].trim();
      console.log("to search");

      if (text !== "") {
        console.log("searching");
        const { data } = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${text}&apikey=${key}`
        );

        stock.x = Object.keys(data["Weekly Time Series"]);
        stock.y = Object.values(data["Weekly Time Series"]).map(
          (item) => item["1. open"]
        );
        payload = stock;
      }

      dispatch({
        type: "SEARCH_STOCK",
        payload,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "STOCK_ERROR",
        payload: error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        selectedStock: state.selectedStock,
        suggestions: state.suggestions,
        loading: state.loading,
        error: state.error,
        searchSymbol,
        searchStock,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
