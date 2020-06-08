import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { numberWithCommas } from "../../utils/format";

const BalanceSheet = () => {
  const { transactions } = useContext(GlobalContext);
  const income = transactions
    .filter((transaction) => transaction.amount >= 0)
    .map((transaction) => transaction.amount)
    .reduce((total, amount) => total + amount, 0)
    .toFixed(2);
  const expense = (
    transactions
      .filter((transaction) => transaction.amount < 0)
      .map((transaction) => transaction.amount)
      .reduce((total, amount) => total + amount, 0) * -1
  ).toFixed(2);

  return (
    <div className="balancesheet-container">
      <div>
        <h4>Income</h4>
        <p id="money-plus" className="money plus">
          ${numberWithCommas(income)}
        </p>
      </div>
      <div>
        <h4>Expense</h4>
        <p id="money-minus" className="money minus">
          ${numberWithCommas(expense)}
        </p>
      </div>
    </div>
  );
};

export default BalanceSheet;
