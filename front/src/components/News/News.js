import React, { useContext } from "react";
import { ReactTinyLink } from "react-tiny-link";
import styles from "./News.module.css";

const News = () => {
  const url = "https://www.google.com";
  const url2 = "https://www.bing.com";
  const url3 = "https://duckduckgo.com/";

  return (
    <div className={styles.side}>
      <div className={styles.card}>
        <ReactTinyLink
          cardSize="small"
          showGraphic={true}
          maxLine={2}
          minLine={1}
          url={url}
        />
      </div>
      <div className={styles.card}>
        <ReactTinyLink
          cardSize="small"
          showGraphic={true}
          maxLine={2}
          minLine={1}
          url={url2}
        />
      </div>
      <div className={styles.card}>
        <ReactTinyLink
          cardSize="small"
          showGraphic={true}
          maxLine={2}
          minLine={1}
          url={url3}
        />
      </div>
    </div>
  );
};

export default News;
