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
  const sentiment = selectedStock ? selectedStock.sentiment.score_tag : "N/A";

  return (
    <div className={styles.container}>
      <Paper elevation={3} className={cx(styles.card, upOrDown)}>
        <Typography color="textSecondary" noWrap className={styles.typography}>
          Price:
        </Typography>
        <Typography variant="h5" width="fit-content">
          {price}
        </Typography>
      </Paper>
      <Paper elevation={3} className={cx(styles.card, styles.neutral)}>
        <Typography color="textSecondary" noWrap>
          Sentiment:
        </Typography>
        <Typography variant="h5" width="fit-content">
          {sentiment}
        </Typography>
      </Paper>
      <Paper elevation={3} className={cx(styles.card)}>
        <Typography color="textSecondary">Price:</Typography>
        <Typography variant="h5" width="fit-content">
          {selectedStock ? selectedStock.y[0] : "N/A"}
        </Typography>
      </Paper>
    </div>
  );
};

export default Cards;
