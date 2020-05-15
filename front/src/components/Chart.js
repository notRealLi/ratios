import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { GlobalContext } from "../context/GlobalState";

const Chart = () => {
  const { datasetForChart } = useContext(GlobalContext);
  let data = {};

  if (!datasetForChart)
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
      labels: datasetForChart.x.slice(0, 11),
      datasets: [
        {
          label: "Price",
          data: datasetForChart.y.slice(0, 11),
          fill: false,
          borderColor: "rgba(75, 192, 192, 1)",
        },
      ],
    };
  }

  console.log(datasetForChart);

  return (
    <>
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
