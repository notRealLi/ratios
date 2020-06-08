import React from "react";
import { Search, Chart, Card } from "./components";
import { GlobalProvider } from "./context/GlobalState";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./App.module.css";

function App() {
  return (
    <GlobalProvider>
      <div className={styles.container}>
        <Card />
        <Search />
        <Chart />
      </div>
    </GlobalProvider>
  );
}

export default App;
