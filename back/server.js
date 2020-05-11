const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config({
  path: "./config/config.env",
});

connectDB();

const transactionRoutes = require("./routes/transactionRoutes");
const stockRoutes = require("./routes/stockRoutes");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/stocks", stockRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../front/build"));

  app.get("*", (req, res) => {
    res.sendfile(path.join(__dirname + "/../front/build/index.html"));
  });
}

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
