import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "firebase/app";

import { auth } from "../firebase";
import firebase from "firebase/app";

const LoginForm = () => {
  return (
    <div className="wrapper">
      <div className="form">
        <div>
          <h1 className="title">Welcome to Chit-Chat</h1>
        </div>
        <div
          className="auth-button"
          style={{ backgroundColor: "#4285F4" }}
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <GoogleOutlined />
          Sign in with Google
        </div>

        <div
          className="auth-button"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
          }
        >
          <FacebookOutlined />
          Sign in with Facebook
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
