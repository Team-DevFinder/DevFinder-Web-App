import React from "react";
import styles from "./PageNotFound.module.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.boxContainer}>
          <div className={styles.bigText}> 404 </div>
          <div className={styles.para}>
            The page you are looking for doesn't exist or has been recently
            moved :(
          </div>
          <Link to="/">
            <button className={styles.homeButton}> Return home? </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
