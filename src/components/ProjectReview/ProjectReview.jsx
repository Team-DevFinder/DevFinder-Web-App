import React from "react";
import styles from "./ProjectReview.module.css";
import Profile from "../../assets/dhanya2.jpg";
import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export const ProjectReview = (props) => {
  const [imgSrc, setImgSrc] = useState("Invalid Image Source");
  const { currentUUID } = useContext(AuthContext);

  return (
    <>
      <div className={styles.review}>
        <img
          src={props.image}
          className={styles.userImage}
          onError={() => setImgSrc()}
          alt=""
        />

        <div className={styles.boxContainer}>
          <p>
            <i>{props.username}</i>
          </p>
          <ImQuotesLeft />
          <p className={styles.comment}>{props.comment}</p>

          <ImQuotesRight className={styles.rightQuotes} />
          {currentUUID === props.ownerId && (
            <div className={styles.iconsContainer}>
              <MdEdit className={styles.editIcon} size={20} />
              <MdDelete
                className={styles.deleteIcon}
                size={20}
                onClick={props.handleReviewDelete}
              />
            </div>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};
