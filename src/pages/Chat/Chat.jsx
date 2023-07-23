import React from "react";
import styles from "./Chat.module.css";
import { InboxCard } from "../../components/InboxCard/InboxCard";
import defaultImg from "../../assets/default-image.svg";

const Chat = () => {
  return (
    <div className={styles.container}>
      <div>List</div>
      <div>List</div>
      {/* <InboxCard
        // imageURL={`${baseURL}${items.pfp}`}
        username={"items.name"}
        subject={"items.subject"}
        content={"items.body"}
        // time={"items.createdAt"}
      />
      <div className={styles.chatsContainer}>
        <img src={defaultImg} />
        <div>username</div>
      </div> */}
    </div>
  );
};

export default Chat;
