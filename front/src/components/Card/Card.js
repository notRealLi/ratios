import React, { useContext } from "react";
import { Typography, Paper, Grid } from "@material-ui/core";
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

  const xs = 12;
  const sm = 12;
  const md = 3;

  return (
    <Grid container spacing={3} className={styles.container}>
      <Grid
        item
        component={Paper}
        elevation={3}
        xs={xs}
        sm={sm}
        md={md}
        className={cx(styles.card, upOrDown)}
      >
        <Typography color="textSecondary" noWrap>
          Price:
        </Typography>
        <Typography variant="h5" width="fit-content">
          {price}
        </Typography>
      </Grid>

      <Grid
        item
        component={Paper}
        elevation={3}
        xs={xs}
        sm={sm}
        md={md}
        className={cx(styles.card, styles.noChange)}
      >
        <Typography color="textSecondary" noWrap>
          Currency / Type:
        </Typography>
        <Typography variant="h6" width="fit-content" noWrap>
          {currencyAndType}
        </Typography>
      </Grid>

      <Grid
        item
        component={Paper}
        elevation={3}
        xs={xs}
        sm={sm}
        md={md}
        className={cx(styles.card, styles[sentiment])}
      >
        <Typography color="textSecondary" noWrap>
          Sentiment:
        </Typography>
        <Typography variant="h5" width="fit-content">
          {sentiment}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Cards;
