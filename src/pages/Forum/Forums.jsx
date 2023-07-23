import React, { useEffect, useState } from "react";
import styles from "./Forums.module.css";
import { useAxios } from "../../utils/useAxios";
import defaultImage from "../../assets/banner5.jpg";
import ForumCard from "../../components/ForumCard/ForumCard";
import { useNavigate } from "react-router-dom";
import AddForumModal from "../../components/AddForumModal/AddForumModal";
import { toast, Toaster } from "react-hot-toast";
import formatDate from "../../utils/formatDate";
import PaginationNew from "../../components/PaginationNew/PaginationNew";

import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

const Forums = () => {
  const api = useAxios();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [forums, setForums] = useState([]);

  const getData = async () => {
    const response = await api.get(`user-api/forums/?page=${currentPage}`);
    console.log(response);
    setForums(response.data.results);
    setTotalPages(Math.ceil(response.data.count / 6));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const [defaultThumbnail, setDefaultThumbnail] = useState(null);

  const convertImageToFile = async () => {
    // Fetch the image data as a blob
    const response = await fetch(defaultImage);
    const imageBlob = await response.blob();

    // Create a new File object from the blob
    const file = new File([imageBlob], "default.jpg", {
      type: "image/jpeg",
    });

    // Now you have the image as a File type object
    // console.log("bruh", file);
    setDefaultThumbnail(file);
  };

  useEffect(() => {
    getData();
    convertImageToFile();
  }, [currentPage]);

  const handleNavigate = (forumId) => {
    navigate(`/forums/${forumId}`);
  };

  const [showModal, setShowModal] = useState(false);

  const [forumTitle, setForumTitle] = useState("");
  const [forumDescription, setForumDescription] = useState("");
  const [forumImage, setForumImage] = useState(null);

  const handlePost = async () => {
    const formData = new FormData();

    formData.append("title", forumTitle);
    formData.append("description", forumDescription);

    // if (forumImage === null) {
    //   formData.append("image", defaultThumbnail);
    //   console.log(defaultThumbnail);
    // } else {
    //   formData.append("image", forumImage);
    // }

    // for (const bruh of formData) {
    //   console.log(bruh);
    // }

    try {
      const response = await api.post(`user-api/forums/`, formData);
      console.log(response);
      if (response.status == 201) {
        toast.success("Forum created");
        setShowModal(false);
        setForumImage(null);
        getData();
        convertImageToFile();
      } else {
        toast.error("error :(");
      }
    } catch (error) {
      toast.error("error :(");
    }
  };

  return (
    <>
      <Toaster />
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
        {showModal && (
          <AddForumModal
            closeModal={() => {
              setShowModal(false);
              setForumImage(null);
            }}
            setForumTitle={setForumTitle}
            setForumDescription={setForumDescription}
            setForumImage={setForumImage}
            forumImage={forumImage}
            handlePost={handlePost}
          />
        )}
        <div className={styles.cardsContainer}>
          <ForumCard
            thumbnail={defaultImage}
            cardTitle={"ChatGPT vs BRAD"}
            createdBy={"user"}
          />
          {forums.map((forum) => (
            <ForumCard
              thumbnail={defaultImage}
              cardTitle={forum.title}
              createdBy={forum.creator}
              forumId={forum.id}
              handleNavigate={handleNavigate}
              time={formatDate(forum.created_at)}
            />
          ))}
        </div>
        <PaginationNew
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </div>
    </>
  );
};

export default Forums;
