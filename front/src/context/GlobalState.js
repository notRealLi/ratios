import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
  selectedStock: null,
  transactions: [],
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

  async function searchDataset(stock) {
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
        type: "SEARCH_DATASET",
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

  async function getTransactions() {
    try {
      const {
        data: { data },
      } = await axios.get("/api/v1/transactions");

      dispatch({
        type: "GET_TRANSACTIONS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);

      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/v1/transactions",
        transaction,
        config
      );

      dispatch({
        type: "ADD_TRANSACTION",
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        selectedStock: state.selectedStock,
        suggestions: state.suggestions,
        transactions: state.transactions,
        loading: state.loading,
        error: state.error,
        searchSymbol,
        searchDataset,
        getTransactions,
        dispatch,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
