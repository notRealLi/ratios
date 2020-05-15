import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
  datasetForChart: null,
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
      const res = await axios.get("/api/v1/stocks/keys");
      const key = res.data.data[Math.floor(Math.random(res.data.size))];
      let payload = [];
      text = text.trim();

      if (text != "") {
        const res = await axios.get(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${text}&apikey=${key}`
        );

        if (res.data.bestMatches)
          payload = res.data.bestMatches.map((item) => ({
            value: item["1. symbol"],
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

  async function searchDataset(text) {
    try {
      const res = await axios.get("/api/v1/stocks/keys");
      const key = res.data.data[Math.floor(Math.random(res.data.size))];
      let payload = null;
      text = text.trim();
      console.log("to search");

      if (text != "") {
        console.log("searching");
        const res = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${text}&apikey=${key}`
        );
        console.log(res);
        const x = Object.keys(res.data["Weekly Time Series"]);
        const y = Object.values(res.data["Weekly Time Series"]).map(
          (item) => item["1. open"]
        );
        payload = { x, y };
        console.log(res.data["Meta Data"]);
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
      const res = await axios.get("/api/v1/transactions");

      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
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
      const res = await axios.post("/api/v1/transactions", transaction, config);

      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
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
        datasetForChart: state.datasetForChart,
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
