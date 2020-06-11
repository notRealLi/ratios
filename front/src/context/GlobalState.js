import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
  selectedStock: null,
  newsList: [],
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
        data: { data: keys, size },
      } = await axios.get("/api/v1/stocks/keys");
      const key = keys[Math.floor(Math.random() * size)];
      let payload = [];
      text = text.trim();

      if (text !== "") {
        const { data: symbols } = await axios.get(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${text}&apikey=${key.key}`
        );

        if (symbols.bestMatches)
          payload = symbols.bestMatches.map((item) => ({
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
        type: "SYMBOL_API_ERROR",
        payload: error,
      });
    }
  }

  async function searchStock(stock) {
    try {
      const {
        data: { data: keys, size },
      } = await axios.get("/api/v1/stocks/keys");
      let key = keys[Math.floor(Math.random() * size)];
      let payload = null;
      const text = stock["1. symbol"].trim();

      if (text !== "") {
        let { data } = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${text}&apikey=${key.key}`
        );

        stock.x = Object.keys(data["Weekly Time Series"]);
        stock.y = Object.values(data["Weekly Time Series"]).map(
          (item) => item["1. open"]
        );
        payload = stock;
      }

      payload = await _getSentiment(payload);

      dispatch({
        type: "SEARCH_STOCK",
        payload,
      });
    } catch (error) {
      dispatch({
        type: "STOCK_API_ERROR",
        payload: error,
      });
    }
  }

  async function _getSentiment(stock) {
    try {
      const text = stock["2. name"].trim();
      const config = {
        params: {
          key: "6a84b417edc5840ed05bc27993a11844",
          lang: "en",
          txt: text,
        },
      };

      const { data } = await axios.post(
        "https://api.meaningcloud.com/sentiment-2.1",
        null,
        config
      );

      stock.sentiment = data;
      return stock;
    } catch (error) {
      return stock;
    }
  }

  async function searchNews(stock) {
    try {
      const text = stock["2. name"].trim();

      const { data } = await axios.get(
        "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI",
        {
          headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host":
              "contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "6a987ca92amsh30c066c51e3dae1p17be9ajsnf227502283a3",
          },
          params: {
            autoCorrect: "false",
            pageNumber: "1",
            pageSize: "4",
            q: text,
            safeSearch: "false",
          },
        }
      );

      dispatch({
        type: "SEARCH_NEWS",
        payload: data.value,
      });
    } catch (error) {
      dispatch({
        type: "API_ERROR",
        payload: error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        selectedStock: state.selectedStock,
        newsList: state.newsList,
        suggestions: state.suggestions,
        loading: state.loading,
        error: state.error,
        searchSymbol,
        searchStock,
        searchNews,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
