import React, { useRef } from "react";
import styles from "./AddForumModal.module.css";
import { BsImage } from "react-icons/bs";

const AddForumModal = (props) => {
  const fileRef = useRef(null);

  return (
    <div className={styles.modal} onClick={props.closeModal}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          placeholder="Title"
          className={styles.modalTitle}
          onChange={(e) => {
            props.setForumTitle(e.target.value);
          }}
        />

        <textarea
          placeholder="Description"
          className={styles.modalDescription}
          onChange={(e) => {
            props.setForumDescription(e.target.value);
          }}
        />

        <div className={styles.modalThumbnail}>
          <button
            onClick={() => {
              fileRef.current.click();
            }}
          >
            <BsImage style={{ paddingTop: "3px" }} /> Upload Thumbnail
          </button>
          <div>{props.forumImage?.name}</div>
          <input
            type="file"
            ref={fileRef}
            style={{ display: "none" }}
            onChange={(e) => {
              props.setForumImage(e.target.files[0]);
            }}
          />
        </div>
        <div className={styles.buttons}>
          <button className={styles.postButton} onClick={props.handlePost}>
            Post
          </button>
          <button className={styles.cancelButton} onClick={props.closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddForumModal;
