import React, { useEffect, useState } from "react";
import styles from "./IndividualForum.module.css";
import { useAxios } from "../../../utils/useAxios";
import { useParams } from "react-router-dom";
import defaultImg from "../../../assets/banner5.jpg";
import ForumPost from "../../../components/ForumPost/ForumPost";
import { toast, Toaster } from "react-hot-toast";
import formatDate from "../../../utils/formatDate";
import ForumComment from "../../../components/ForumComment/ForumComment";

const IndividualForum = () => {
  const api = useAxios();
  const { id } = useParams();

  const [currentForum, setCurrentForum] = useState();
  const [comments, setComments] = useState([]);

  const getData = async () => {
    const response = await api.get(`user-api/forums/`);
    console.log(response);
    const forums = response.data.results;
    const filteredForum = forums.find((forum) => forum.id === id);
    console.log(filteredForum);
    setCurrentForum(filteredForum);
    setComments(filteredForum.discussions);
  };

  useEffect(() => {
    getData();
  }, []);

  const [comment, setComment] = useState("");

  const handleComment = async () => {
    if (comment === "") {
      toast.error("Review cannot be empty :(");
      return;
    }

    const responseNSFW = await api.post(`project-api/review/mod/`, {
      comment: comment,
    });
    console.log("nsfw", responseNSFW);

    if (responseNSFW.data.prediction === "Review is clean") {
      try {
        const response = await api.post(`user-api/forums/${id}/discussions/`, {
          message: comment,
        });
        console.log(response);
        setComment("");
        toast.success("Comment posted");
        getData();
      } catch (error) {
        toast.error("Error posting comment :(");
      }
    } else {
      toast.error("Profane comments not allowed");
    }
  };

  const dummy = {
    desc: `By the time we arrived there were about 20
    people there. My sisters and their husbands were already solidly
    buzzed. Drunk really. My mom was spending 100% of her time trying to
    keep the nieces & nephews (ages 7 to 11) more or less under control .
    My dad had strategically retreated to the whirlpool part of the pool
    with small cooler full of beers. Wife and I made small talk with
    miscellaneous people, ate food and had a frozen margarita.
    Sisters/BILs took turns criticizing us for being late, not being in
    our swimsuits and screwing up the vibe. Whatever. Typical suburban
    summer get together.`,
    title: `AITA for jumping out of the way when my niece
    and nephew tried to push me into a pool, resulting in them falling in?`,
  };

  return (
    <>
      <Toaster />
      <div className={styles.container}>
        <ForumPost
          // title={currentForum?.title}
          title={dummy.title}
          creator={currentForum?.creator}
          thumbnail={defaultImg}
          // description={currentForum?.description}
          description={dummy.desc}
          comment={comment}
          setComment={setComment}
          handleComment={handleComment}
          time={formatDate(currentForum?.created_at)}
        />
        <div className={styles.commentsContainer}>
          <ForumComment
            creator={"Username"}
            message={dummy.title}
            time={"July 22, 2023"}
          />
          <ForumComment
            creator={"Username"}
            message={dummy.desc}
            time={"July 22, 2023"}
          />
          {comments?.map((forumComment) => (
            <ForumComment
              creator={forumComment.creator}
              message={forumComment.message}
              time={formatDate(forumComment.created_at)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default IndividualForum;
