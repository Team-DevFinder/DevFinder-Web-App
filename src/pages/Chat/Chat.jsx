import React from "react";
import styles from "./Chat.module.css";
import { InboxCard } from "../../components/InboxCard/InboxCard";
import defaultImg from "../../assets/default-image.svg";

const Chat = () => {
  return (
    <div className={styles.container}>
      <div className={styles.chatsContainer}>
        <div className={styles.chatCard}>
          <div className={styles.chatImage}>
            <img src={defaultImg} />
          </div>
          <div className={styles.chatInfo}>
            <div className={styles.chatName}>Username</div>
            <div className={styles.chatMessage}>This is the latest message</div>
          </div>
        </div>
        <div className={styles.chatCard}>
          <div className={styles.chatImage}>
            <img src={defaultImg} />
          </div>
          <div className={styles.chatInfo}>
            <div className={styles.chatName}>Username</div>
            <div className={styles.chatMessage}>This is the latest message</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
