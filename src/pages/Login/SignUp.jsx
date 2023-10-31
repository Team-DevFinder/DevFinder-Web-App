import React, { useContext, useEffect, useState } from "react";
import styles from "./SignUp.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import jwtDecode from "jwt-decode";

import { AuthContext } from "../../context/AuthContext";

import { useAxios } from "../../utils/useAxios";
import { ForgotPassword } from "../ForgotPassword/ForgotPassword";
import { baseURL } from "../../utils/config";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
import { BounceLoader } from "react-spinners";

export const SignUp = () => {

    const [signIn, toggle] = useState(true);
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { authTokens, loginUser, logoutUser, registerUser, googleLogin } =
    useContext(AuthContext);

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLogin = () => {
    setLoading(true);
    loginUser(signInUsername, signInPassword);
    toast.promise(saveSettings(settings), {
      loading: "Saving...",
      success: <b>Welcome to DevFinder!</b>,
      error: <b>Cannot log in. Please try again</b>,
    });
  };

  console.log("Tokens", authTokens);

  const handleRegister = async () => {
    const response = await registerUser(
      registerFirstName,
      registerUsername,
      registerEmail,
      registerPassword
    );
    console.log(response);
    toggle(true);
  };

  const api = useAxios();

  const comment = { comment: "Your is so nice" };

  const testAuth = async () => {
    // const response = await axios.post(`${baseURL}/api/token/refresh/`, {
    //   refresh: authTokens?.refresh,
    // });
    // console.log(response);
    const user = jwtDecode(authTokens?.access);
    // const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    // console.log(user);
    // console.log(isExpired);
    console.log("hrllo");
  };

  // const sendMessage = aync () => {
  //   const
  // }

  const [showLoginPage, setShowLoginPage] = useState(true);

  const handleSignUpClick = () => {
    setShowLoginPage(false);
  };

  const handleLoginClick = () => {
    setShowLoginPage(true);
  };

  return (
    <form
    action="#"
    onSubmit={(e) => {
      e.preventDefault();
    }}
    className={styles.signUpContainer2}
    
  >
    <h2>Create Account</h2>
    <br />
    <div className={styles.actualForm2}>
      <input
        className={styles.inputField2}
        type="text"
        placeholder="Name"
        onChange={(e) => {
          setRegisterFirstName(e.target.value);
        }}
      />
      <input
        className={styles.inputField2}
        type="text"
        placeholder="Username"
        onChange={(e) => {
          setRegisterUsername(e.target.value);
        }}
      />
      <input
        className={styles.inputField2}
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setRegisterEmail(e.target.value);
        }}
      />
      <input
        className={styles.inputField2}
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setRegisterPassword(e.target.value);
        }}
      />
      <br /><br />
      <button className="signupbutton" onClick={handleRegister}>
        Sign Up
      </button>
    </div>
</form>
  )
}
