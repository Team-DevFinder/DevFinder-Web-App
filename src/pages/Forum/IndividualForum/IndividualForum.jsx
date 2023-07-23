import React, { useEffect, useState } from "react";
import styles from "./IndividualForum.module.css";
import { useAxios } from "../../../utils/useAxios";
import { useParams } from "react-router-dom";
import defaultImg from "../../../assets/banner5.jpg";

const IndividualForum = () => {
  const api = useAxios();
  const { id } = useParams();

  const [currentForum, setCurrentForum] = useState();

  const getData = async () => {
    const response = await api.get(`user-api/forums/`);
    console.log(response);
    const forums = response.data.results;
    const filteredForum = forums.find((forum) => forum.id === id);
    console.log(filteredForum);
    setCurrentForum(filteredForum);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        <div className={styles.postTitle}>
          {currentForum?.title} AITA for jumping out of the way when my niece
          and nephew tried to push me into a pool, resulting in them falling in?
        </div>
        <div className={styles.postCreator}>{currentForum?.creator}</div>
        <img src={defaultImg} className={styles.postImage} />
        <div className={styles.postDesc}>
          {currentForum?.description} By the time we arrived there were about 20
          people there. My sisters and their husbands were already solidly
          buzzed. Drunk really. My mom was spending 100% of her time trying to
          keep the nieces & nephews (ages 7 to 11) more or less under control .
          My dad had strategically retreated to the whirlpool part of the pool
          with small cooler full of beers. Wife and I made small talk with
          miscellaneous people, ate food and had a frozen margarita.
          Sisters/BILs took turns criticizing us for being late, not being in
          our swimsuits and screwing up the vibe. Whatever. Typical suburban
          summer get together.
        </div>
        <textarea
          placeholder="Share your thoughts"
          className={styles.postComment}
        />
        <div className={styles.buttons}>
          <button className={styles.commentButton}>Comment</button>
        </div>
      </div>
      <div>Comment Section</div>
    </div>
  );
};

export default IndividualForum;
