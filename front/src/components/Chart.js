import React, { useContext } from "react";
import Header from "./Header";
import { Line } from "react-chartjs-2";
import { GlobalContext } from "../context/GlobalState";

const Chart = () => {
  const { selectedStock } = useContext(GlobalContext);
  let data = {};

  if (!selectedStock)
    data = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
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

  console.log(selectedStock);

  return (
    <>
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
    </>
  );
};

export default Chart;
