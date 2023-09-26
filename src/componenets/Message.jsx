import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contextapi/Context";
import { ChatContext } from "../contextapi/ChatContext";

const Message = ({message}) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  const dateObject = message.date.toDate();
  dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);


  return (
    <div ref={ref} className={`Message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="messageInfo">
            <img src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          } alt=""/>
            <span>{formattedDate}</span>
        </div>
        
        <div className="messageContent">
         <p>{message.text}</p>
         {message.img && <img src={message.img} alt="" />}
        </div>

    </div>
  )
}

export default Message