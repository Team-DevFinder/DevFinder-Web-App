import React, { useEffect, useState } from "react";
import styles from "./Forums.module.css";
import { useAxios } from "../../utils/useAxios";
import banner from "../../assets/banner5.jpg";
import ForumCard from "../../components/ForumCard/ForumCard";
import { useNavigate } from "react-router-dom";
import AddForumModal from "../../components/AddForumModal/AddForumModal";

const Forums = () => {
  const api = useAxios();
  const navigate = useNavigate();

  const [forums, setForums] = useState([]);

  const getData = async () => {
    const response = await api.get(`user-api/forums/`);
    console.log(response);
    setForums(response.data.results);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleNavigate = (forumId) => {
    navigate(`/forums/${forumId}`);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Forums</div>
          <button
            className={styles.createButton}
            onClick={() => setShowModal(true)}
          >
            Create Forum
          </button>
        </div>
        {showModal && <AddForumModal closeModal={() => setShowModal(false)} />}
        <div className={styles.cardsContainer}>
          <ForumCard
            thumbnail={banner}
            cardTitle={"ChatGPT vs BRAD"}
            createdBy={"user"}
          />
          {forums.map((forum) => (
            <ForumCard
              thumbnail={banner}
              cardTitle={forum.title}
              createdBy={forum.creator}
              forumId={forum.id}
              handleNavigate={handleNavigate}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Forums;
