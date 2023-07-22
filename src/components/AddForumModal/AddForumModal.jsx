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
        <input placeholder="Title" className={styles.modalTitle} />

        <textarea
          placeholder="Description"
          className={styles.modalDescription}
        />

        <div className={styles.modalThumbnail}>
          <button
            onClick={() => {
              fileRef.current.click();
            }}
          >
            <BsImage style={{ paddingTop: "3px" }} /> Upload Thumbnail
          </button>
          <input type="file" ref={fileRef} style={{ display: "none" }} />
        </div>
        <div className={styles.buttons}>
          <button className={styles.postButton}>Post</button>
          <button className={styles.cancelButton} onClick={props.closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddForumModal;
