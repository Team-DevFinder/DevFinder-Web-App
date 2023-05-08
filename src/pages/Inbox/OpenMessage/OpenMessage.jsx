import React from 'react'
import styles from './OpenMessage.module.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAxios } from '../../../utils/useAxios';
import {RxCross2} from 'react-icons/rx'
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';


export const OpenMessage = (props) => {
    if (!props.show){
        return null
    }

    const { currentUUID } = useContext(AuthContext);
  console.log(currentUUID);
  
  const [message, setMessage] = useState();
  
  
  const api = useAxios();
  
  const fetchMessages = async () => {
    const response = await api.get(`user-api/profiles/${currentUUID}/messages/`);
    console.log(response);
    setMessage(response.data.results);
    console.log(message);
  }

  useEffect(() => {
    fetchMessages();
  }, [])

    

  return (
    <div className={styles.wrapper} onClick={props.onClose}>
        <div className={styles.msgContainer} onClick={e => e.stopPropagation()}>
            <div className={styles.header}>
              <h1>From <i>{props.name}</i>,</h1>
              <h3 htmlFor="" style={{marginTop: '1em'}}>Subject</h3>
              <p>{props.subject}</p>
              <h3 htmlFor="" style={{marginTop: '1em'}}>Message</h3>
              <p>{props.message}</p>

             
              <RxCross2 onClick={props.onClose} size={22} className={styles.closeButton} />

            </div>

        </div>
    </div>
  )
}
