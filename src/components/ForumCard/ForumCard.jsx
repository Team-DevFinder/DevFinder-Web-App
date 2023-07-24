import React from "react";
import styles from "./ForumCard.module.css";
import { MdDelete } from "react-icons/md";

const ForumCard = (props) => {
  return (
    <div
      className={styles.card}
      onClick={() => {
        props.handleNavigate(props.forumId);
      }}
    >
      <div className={styles.thumbnail}>
        <img src={props.thumbnail} />
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.cardTitle}>{props.cardTitle}</div>
        <div className={styles.createdBy}>
          Posted by {props.createdBy} on {props.time}
        </div>
      </div>
      <MdDelete className={styles.deleteButton} />
    </div>
  );
};

export default ForumCard;
