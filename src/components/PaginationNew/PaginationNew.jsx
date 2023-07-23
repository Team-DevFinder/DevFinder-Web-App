import React, { useState } from "react";
import styles from "./PaginationNew.module.css";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

const PaginationNew = (props) => {
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.btn}
        onClick={props.handlePreviousPage}
        disabled={props.currentPage === 1}
      >
        <GrFormPrevious size={25} />
      </button>

      <p>
        Page {props.currentPage} of {props.totalPages}
      </p>
      <button
        className={styles.btn}
        onClick={props.handleNextPage}
        disabled={props.currentPage === props.totalPages}
      >
        <GrFormNext size={25} />
      </button>
      <div></div>
    </div>
  );
};

export default PaginationNew;
