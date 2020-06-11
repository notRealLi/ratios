import React, { useContext } from "react";
import Header from "../Header/Header";
import { Line } from "react-chartjs-2";
import { GlobalContext } from "../../context/GlobalState";
import styles from "./Chart.module.css";

const Chart = () => {
  const { selectedStock } = useContext(GlobalContext);
  let data = {};

  if (!selectedStock)
    data = {
      labels: ["01", "02", "03", "04", "05", "06"],
      datasets: [
        {
          label: "Price",
          data: [1, 7, 3, 2, 5, 6],
          fill: false,
          borderColor: "rgba(75, 192, 192, 1)",
        },
      ],
    };
  else {
    data = {
      labels: selectedStock.x.slice(0, 11).reverse(),
      datasets: [
        {
          label: "Price",
          data: selectedStock.y.slice(0, 11).reverse(),
          fill: false,
          borderColor: "rgba(75, 192, 192, 1)",
        },
      ],
    };
  }

  // if (selectedStock) console.log(selectedStock);

  return (
    <div className={styles.container}>
      <Header
        title={`Time series${
          selectedStock ? ` - ${selectedStock["2. name"]}` : ""
        }`}
      />
      <Line
        data={data}
        options={{
          fill: false,
          responsive: true,
        }}
      />
    </div>
  );
};

export default Chart;
