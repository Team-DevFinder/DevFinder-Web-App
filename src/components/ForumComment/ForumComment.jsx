import React from "react";
import styles from "./ForumComment.module.css";

const ForumComment = (props) => {
  return (
    <div className={styles.commentCard}>
      <div className={styles.commentPoster}>
        {props.creator}
        <span className={styles.metaText}> &middot; {props.time}</span>
      </div>
      <div className={styles.commentBody}>{props.message}</div>
    </div>
  );
};

export default ForumComment;
