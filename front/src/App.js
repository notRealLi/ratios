import React from "react";
import { Search, Chart, Card, News } from "./components";
import { GlobalProvider } from "./context/GlobalState";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./App.module.css";

function App() {
  return (
    <GlobalProvider>
      <div className={styles.container}>
        <div className={styles.main}>
          <Card />
          <Search />
          <Chart />
        </div>
        {/* <News /> */}
      </div>
    </GlobalProvider>
  );
}

export default App;
