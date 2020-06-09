import React, { useContext } from "react";
import { Typography, Paper } from "@material-ui/core";
import { GlobalContext } from "../../context/GlobalState";
import cx from "classnames";
import styles from "./Card.module.css";

const Cards = () => {
  const { selectedStock } = useContext(GlobalContext);
  const price = selectedStock
    ? `$${Number(selectedStock.y[0]).toFixed(2)}`
    : "N/A";
  const upOrDown = selectedStock
    ? selectedStock.y[0] > selectedStock.y[1]
      ? styles.up
      : styles.down
    : styles.noChange;
  const currencyAndType = selectedStock
    ? selectedStock["8. currency"] + " / " + selectedStock["3. type"]
    : "N/A";

  const scoreTag = selectedStock ? selectedStock.sentiment.score_tag : "N/A";
  let sentiment = "";
  if (scoreTag === "P" || scoreTag === "P+") {
    sentiment = "positive";
  } else if (scoreTag === "N" || scoreTag === "N+") {
    sentiment = "negative";
  } else {
    sentiment = "neutral";
  }

  return (
    <div className={styles.container}>
      <Paper elevation={3} className={cx(styles.card, upOrDown)}>
        <Typography color="textSecondary" noWrap>
          Price:
        </Typography>
        <Typography variant="h5" width="fit-content">
          {price}
        </Typography>
      </Paper>

      <Paper elevation={3} className={cx(styles.card, styles.noChange)}>
        <Typography color="textSecondary" noWrap>
          Currency / Type:
        </Typography>
        <Typography variant="h5" width="fit-content">
          {currencyAndType}
        </Typography>
      </Paper>

      <Paper elevation={3} className={cx(styles.card, styles[sentiment])}>
        <Typography color="textSecondary" noWrap>
          Sentiment:
        </Typography>
        <Typography variant="h5" width="fit-content">
          {sentiment}
        </Typography>
      </Paper>
    </div>
  );
};

export default Cards;
