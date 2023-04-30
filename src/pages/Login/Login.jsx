import React, { useContext, useEffect, useState } from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios';

import {FcGoogle} from 'react-icons/fc'
import jwtDecode from 'jwt-decode';

import { AuthContext } from '../../context/AuthContext';

import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google'; 

import { useAxios } from "../../utils/useAxios"

export const Login = () => {

  const [signIn, toggle] = useState(true);
  
  const {authTokens, loginUser, logoutUser, registerUser, handleGoogleLogin, googleLogin} = useContext(AuthContext);

  // const [signInUsername, setSignInUsername] = useState("");
  // const [signInPassword, setSignInPassword] = useState("");
  // const [registerFirstName, setRegisterFirstName] = useState("");
  // const [registerUsername, setRegisterUsername] = useState("");
  // const [registerEmail, setRegisterEmail] = useState("");
  // const [registerPassword, setRegisterPassword] = useState("");

  const handleLogin = () => {
    loginUser("aryan123", "aryan123");
  }

  console.log("Tokens", authTokens);

  const first_name = "Aryan";
  const username = "aryan123";
  const email = "aryan@gmail.com";
  const password = "aryan123";

  const handleRegister = () => {
    registerUser(first_name, username, email, password);
  }

  const api = useAxios();

  const testAuth = async () => {
    const response = await api.get("/aryan-test/");
    console.log(response);
  }

  const testRefresh = async () => {
    const response = await axios.post(`http://127.0.0.1:8000/api/token/refresh/`, {refresh : authTokens.refresh});
    console.log(response);
  }

  return (
    
    <>
    <main>
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <div className={styles.formsWraps}>
        
          <form action="#" onSubmit={(e) => {e.preventDefault();}} className={styles.signUpContainer} style={signIn !== true ? { 
          transform: 'translateX(100%)',
          opacity: 1,
          zIndex: 5,
          
  } : null}>
            <h2>Create Account</h2><br />
            <div className={styles.actualForm}>
              <input className={styles.inputField} type="text"  placeholder='Name' />
              <input className={styles.inputField} type="text"  placeholder='Username' />
              <input className={styles.inputField} type="email"   placeholder='Email' />
              <input className={styles.inputField} type="password"  placeholder='Password' /><br />
              <button className={styles.button} onClick={handleRegister}>Sign Up</button>
            </div>
          </form>
        

        
          <form action="#" onSubmit={(e) => {e.preventDefault();}} className={styles.signInContainer}  style={signIn !== true ? { 
            transform: 'translateX(100%)',
            opacity: 0,
            
  } : null}>
            <h2 onClick={logoutUser}>Log In</h2> <br />
            
            <div className={styles.actualForm}>
              <input className={styles.inputField} type="email"   placeholder='Email' />
              <input className={styles.inputField} type="password"  placeholder='Password' />
              <Link to="" className={styles.link} onClick={testAuth}>Forgot your password?</Link><br /><br />
              <button className={styles.button} onClick={handleLogin}>Sign In</button>
              <div  className={styles.paragraph}>
                  OR
              </div>
              <button className={styles.googleBtn} onClick={googleLogin}>
                <FcGoogle size={22} style={{margin: '0 10px 0 0'}} />
                <p>Continue with Google</p>
              </button>
            </div>
          </form>
        </div>
        

        <div className={styles.overlayContainer} style={signIn !== true ? { 
    transform: 'translateX(-100%)'
  } : null}>
          <div className={styles.overlay} style={signIn !== true ? { 
    transform: 'translateX(50%)'
  } : null}>
            <div className={styles.leftOverlayPanel}  style={signIn !== true ? { 
    transform: 'translateX(0)'
  } : null}>
              <div className={styles.title}>
                Welcome Back!
              </div>
              <div className={styles.paragraph}>To keep connected with us please login  </div>
              <div className={styles.ghostButton} onClick={() => toggle(true)}>Sign In</div>
            </div>

            <div className={styles.rightOverlayPanel}  style={signIn !== true ? { 
    transform: 'translateX(20%)'
  } : null}>
              <div className={styles.title}>
                Hello, Developer!
              </div>
              <div className={styles.paragraph}>Enter your details and start your journey with us</div>
              <div className={styles.ghostButton} onClick={() => toggle(false)}>Sign Up</div>
            </div>


          </div>
        </div>


      </div>
      </div>
      </main>
    </>
  )
}