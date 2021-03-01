import React from "react";
import moment from "moment";

const MyMessage = ({ message }) => {
  if (message?.attachments?.length > 0) {
    return (
      <img
        src={message.attachments[0].file}
        alt="message-attachment"
        className="message-image"
        style={{ float: "right" }}
      />
    );
  }
  return (
    <div
      className="message"
      style={{
        float: "right",
        marginRight: "18px",
        color: "white",
        backgroundColor: "#3b2a50",
        borderBottomRightRadius: "0px",
      }}
    >
      {message.text}
      <h4>
        <span>{moment(message.created).format("MMM DD h:mm A")}</span>
      </h4>
    </div>
  );
};

export default MyMessage;
