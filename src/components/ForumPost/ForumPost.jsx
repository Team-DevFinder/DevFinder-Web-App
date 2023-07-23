import React from "react";
import styles from "./ForumPost.module.css";

const ForumPost = (props) => {
  return (
    <div className={styles.postContainer}>
      <div className={styles.postTitle}>{props.title}</div>
      <div className={styles.postCreator}>{props.creator}</div>
      <img src={props.thumbnail} className={styles.postImage} />
      <div className={styles.postDesc}>{props.description}</div>
      <textarea
        placeholder="Share your thoughts"
        className={styles.postComment}
        value={props.comment}
        onChange={(e) => {
          props.setComment(e.target.value);
        }}
      />
      <div className={styles.buttons}>
        <button className={styles.commentButton} onClick={props.handleComment}>
          Comment
        </button>
      </div>
    </div>
  );
};

export default ForumPost;
