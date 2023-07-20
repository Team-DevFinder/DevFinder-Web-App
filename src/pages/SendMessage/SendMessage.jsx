import React, { useEffect, useState } from "react";
import styles from "./SendMessage.module.css";
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../../utils/useAxios";
import toast, { Toaster } from "react-hot-toast";

export const SendMessage = () => {
  const navigate = useNavigate();
  const api = useAxios();
  const { id } = useParams();
  const profileUrl = `/user-api/profiles/${id}/`;

  const [receiverUsername, setReceiverUsername] = useState("");

  const fetchReceiverProfile = async () => {
    const response = await api.get(`${profileUrl}`);
    console.log("profile", response);
    setReceiverUsername(response.data.username);
  };

  useEffect(() => {
    fetchReceiverProfile();
  }, []);

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const sendMessage = async () => {
    const message = {
      subject: subject,
      body: body,
    };
    const response = await api.post(`${profileUrl}create-message/`, message);
    notifySuccess();
    console.log("send message", response);
    navigate(-1);
  };

  const notifySuccess = () => {
    toast.success("Sent");
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.msgContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              To <i>{receiverUsername}</i>,
            </h1>
            <h3 htmlFor="" style={{ marginTop: "1em" }}>
              Subject
            </h3>
            <input
              type="text"
              className={styles.inputField}
              placeholder="Enter the subject"
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              required
            />
            <h3 htmlFor="" style={{ marginTop: "1em" }}>
              Message
            </h3>
            <textarea
              name=""
              id={styles.message}
              className={styles.inputField}
              onChange={(e) => {
                setBody(e.target.value);
              }}
              required
            ></textarea>

            <button className={styles.sendButton} onClick={() => sendMessage()}>
              Send
            </button>
            <RxCross2
              onClick={() => navigate("/developers")}
              size={22}
              className={styles.closeButton}
            />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};
