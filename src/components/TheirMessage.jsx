import React from "react";
import moment from "moment";

const TheirMessage = ({ lastMessage, message }) => {
  const isFirstMessageByUser =
    !lastMessage || lastMessage.sender.username !== message.sender.username;
  return (
    <div className="message-row">
      {isFirstMessageByUser && (
        <div
          className="message-avatar"
          style={{ backgroundImage: `url(${message?.sender?.avatar})` }}
        />
      )}
      {message?.attachments?.length > 0 ? (
        <img
          src={message.attachments[0].file}
          alt="message-attachment"
          className="message-image"
          style={{ marginLeft: isFirstMessageByUser ? "4px" : "48px" }}
        />
      ) : (
        <div
          className="message"
          style={{
            float: "left",
            backgroundColor: "#cabcdc",
            marginLeft: isFirstMessageByUser ? "4px" : "48px",
            borderBottomLeftRadius: "0px",
          }}
        >
          {message.text}
          <h4>
            <span style={{ justifySelf: "flex-start" }}>
              {moment(message.created).format("MMM DD h:mm A")}
            </span>
          </h4>
        </div>
      )}
    </div>
  );
};

export default TheirMessage;
