import React from "react";
import { Line } from "react-chartjs-2";

const Chart = () => {
  const data = {
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
