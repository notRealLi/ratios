import React, { useContext } from "react";
import { ReactTinyLink } from "react-tiny-link";
import { GlobalContext } from "../../context/GlobalState";
import styles from "./News.module.css";

const News = () => {
  const { newsList } = useContext(GlobalContext);
  let cards = [];
  if (newsList && newsList.length > 0) {
    cards = newsList.map((news, i) => (
      <div key={i} className={styles.card}>
        <ReactTinyLink
          key={i}
          cardSize="small"
          showGraphic={true}
          maxLine={2}
          minLine={1}
          url={news.url}
        />
      </div>
    ));
  }

  return <div className={styles.side}>{cards}</div>;
};

export default News;
