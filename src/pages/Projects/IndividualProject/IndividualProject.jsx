import React from "react";
import styles from "./IndividualProject.module.css";
import { Link, useParams } from "react-router-dom";
import ProjectImage from "../../../assets/banner5.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "../../../assets/dhanya2.jpg";

import { Modal } from "../../../components/Modal/Modal";
import { useAxios } from "../../../utils/useAxios";

import { ProjectReview } from "../../../components/ProjectReview/ProjectReview";
import { baseURL } from "../../../utils/config";
import toast, { Toaster } from "react-hot-toast";

export const IndividualProject = (props) => {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewProfiles, setReviewProfiles] = useState([]);
  const [tags, setTags] = useState([]);

  const { id } = useParams();
  const projUrl = `/project-api/projects/${id}/`;

  const api = useAxios();

  const fetchProject = async () => {
    try {
      const response = await api.get(projUrl);
      console.log("project: ", response);
      const project = response.data;
      setMyData(project);
      setTags(project.tags.map((tag) => tag.name));

      console.log(`${projUrl}reviews/`);
      try {
        const reviewData = await api.get(`${projUrl}reviews/`);
        console.log("reviews ", reviewData);
        console.log(reviewData.data);

        // const reversedReviews = reviewData.data.results.reverse();
        // setReviews(reversedReviews);

        setReviews(reviewData.data.results);
      } catch (err) {
        // handle errors for this specific await statement
        console.error("Error fetching reviews:", err);
        setIsError(err);
      }
    } catch (err) {
      // handle errors for the entire try block
      console.error("Error fetching project:", err);
      setIsError(err);
    }
  };

  const [reviewBody, setReviewBody] = useState("");

  const reviewTest = {
    body: reviewBody,
  };

  const createReview = async () => {
    console.log(reviewBody);
    const reviewTest = {
      comment: reviewBody,
    };
    const responseNSFW = await api.post(`project-api/review/mod/`, reviewTest);
    console.log("nsfw", responseNSFW);
    if (responseNSFW.data.prediction === "Review is clean") {
      const response = await api.post(`${projUrl}reviews/create/`, {
        body: reviewBody,
      });
      console.log(response);
      setReviewBody("");
      toast.success("Comment posted");
      fetchProject();
    } else {
      toast.error("Profane comments not allowed");
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const handleReviewDelete = async (reviewId) => {
    const response = await api.delete(
      `${baseURL}project-api/reviews/${reviewId}/delete/`
    );
    if (response.status === 204) {
      toast.success("Comment deleted");
      fetchProject();
    } else {
      toast.error("Error deleting comment");
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.project}>
          <div className={styles.projectTools}>
            <h1>Tools And Stacks</h1>
            <br />
            <div className={styles.toolSection}>
              {tags.map((tag) => (
                <>
                  <button className={styles.toolBtn}>{tag}</button>
                </>
              ))}
              {/* <button className={styles.toolBtn}>React</button>
                        <button className={styles.toolBtn}>React</button>
                        <button className={styles.toolBtn}>React</button>
                        <button className={styles.toolBtn}>React</button> */}
            </div>
            <div className={styles.projectLinks}>
              <a
                href={myData.demoLink}
                target="_blank"
                style={{ color: "#eb7724" }}
              >
                Demo Link
              </a>
              <br />
              <br />
              <a
                href={myData.sourceLink}
                target="_blank"
                style={{ color: "#eb7724" }}
              >
                Source Code
              </a>
            </div>
          </div>
          <div className={styles.projectInfo}>
            <img
              src={myData.featuredImage}
              className={styles.projectImage}
              alt=""
            />
            <hr />
            <p className={styles.projectTitle}>
              <b>{myData.title}</b>
            </p>
            <p className={styles.projectDeveloper}>
              <i>By {myData.owner}</i>
            </p>
            <br />
            <p className={styles.aboutProject}>
              <b>ABOUT THE PROJECT</b>
            </p>
            <p className={styles.aboutInfo}>{myData.description}</p>

            <hr />
            <p className={styles.feedback}>
              <b>Feedback</b>
            </p>
            {/* <p className={styles.feedbackInfo}>
              {myData.voteRatio}% Positive Feedback ({myData.voteTotal} votes)
            </p> */}

            <textarea
              className={styles.commentSection}
              id=""
              value={reviewBody}
              onChange={(e) => {
                setReviewBody(e.target.value);
              }}
            ></textarea>

            <button className={styles.commentBtn} onClick={createReview}>
              Comment
            </button>
            <br />

            <p className={styles.feedback}>
              <b>Reviews</b>
            </p>

            {reviews?.map((items) => (
              <>
                <ProjectReview
                  image={`${baseURL}${items.owner?.profileImage}`}
                  username={items.owner?.username}
                  comment={items.body}
                  handleReviewDelete={() => handleReviewDelete(items.id)}
                  ownerId={items.owner.ownerId}
                />
              </>
            ))}

            {/* <button className={styles.commentBtn} onClick={() => setShow(true)}>Delete</button>

                    <Modal onClose={() => setShow(false)} show={show} /> */}
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};
