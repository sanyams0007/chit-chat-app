import React from "react";
import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";

const ChatFeed = (props) => {
  //console.log(props);
  const { chats, activeChat, userName, messages } = props;
  const chat = chats && chats[activeChat];
  const renderReadReceipts = (message, isMyMessage) => {
    return chat.people.map(
      (person, index) =>
        person.last_read === message.id && (
          <div
            key={`read_${index}`}
            className="read-receipt"
            style={{
              float: isMyMessage ? "right" : "left",
              backgroundImage: `url(${person?.person?.avatar})`,
            }}
          />
        )
    );
  };

  const renderUserImg = () => {
    return chat.people.map(
      (person, index) =>
        person?.person?.username === userName && (
          <>
            <img
              key={`img_${index}`}
              src={person?.person?.avatar}
              alt="user"
              className="message-avatar"
            />
          </>
        )
    );
  };

  const renderMessages = () => {
    const keys = Object.keys(messages);
    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? (
              <MyMessage message={message} />
            ) : (
              <TheirMessage
                message={message}
                lastMessage={messages[lastMessageKey]}
              />
            )}
          </div>
          <div
            className="read-receipts"
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marginLeft: isMyMessage ? "0px" : "68px",
            }}
          >
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  if (!chat) return "Loading....";

  const signOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.reload();
  };

  /* const admin = chat?.people.filter((person) => person?.username === userName);
  console.log(admin); */
  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="left_header">
          <div className="chat-title">{chat?.title}</div>
          <div className="chat-subtitle">
            {chat.people.map((person) => ` ${person.person.username}`)}
          </div>
        </div>
        <div className="right_header">
          {renderUserImg()}
          <div className="user_info">
            {chat?.admin?.username === userName ? (
              <h6 className="admin-tag">Admin</h6>
            ) : null}
            <button onClick={signOut}>Sign Out</button>
          </div>
        </div>
      </div>
      {renderMessages()}

      <div style={{ height: "100px" }} />

      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
