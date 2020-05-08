import React from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import BalanceSheet from "./components/BalanceSheet";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";
import { GlobalProvider } from "./context/GlobalState";
import "./App.css";

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <BalanceSheet />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;
