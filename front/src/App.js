import React from "react";
import Search from "./components/Search";
import Chart from "./components/Chart";
import { GlobalProvider } from "./context/GlobalState";
import "./App.css";

function App() {
  return (
    <GlobalProvider>
      <div className="container">
        <Chart />
        <Search />
      </div>
    </GlobalProvider>
  );
}

export default App;
