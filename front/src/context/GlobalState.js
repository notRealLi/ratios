import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
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
      let payload = [];
      if (text != "") {
        const res = await axios.get(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${text}&apikey=W52VB1BHI4STUX4G`
        );
        if (res.data.bestMatches)
          payload = res.data.bestMatches.map((item) => item["1. symbol"]);
      }

      dispatch({
        type: "SEARCH_SYMBOL",
        payload,
      });
    } catch (error) {
      console.log(error);
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
        suggestions: state.suggestions,
        transactions: state.transactions,
        loading: state.loading,
        error: state.error,
        searchSymbol,
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
