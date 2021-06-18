import React, { useState, useEffect } from "react";
import ChatFeed from "./ChatFeed";
import { LoadingOutlined } from "@ant-design/icons";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useHistory } from "react-router";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  console.log(user);

  const handleLogout = async () => {
    await auth.signOut();

    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }

    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "Project-ID": process.env.REACT_APP_CHAT_ENGINE_ID,
          "User-Name": user.email,
          "User-Secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        const [fname, lname] = user.displayName.split(" ");
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);
        formdata.append("first_name", fname);
        formdata.append("last_name", lname);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "PRIVATE-KEY": process.env.REACT_APP_CHAT_ENGINE_KEY,
              },
            })
            .then((res) => {
              console.log(res);
              setLoading(false);
            })
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);

  if (!user || loading)
    return (
      <div className="loading">
        <LoadingOutlined />
      </div>
    );

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">
          <img alt="logo" src="./chat.svg" />
          <h1>Chit-Chat</h1>
        </div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 65px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      />
    </div>
  );
};

export default Chats;
