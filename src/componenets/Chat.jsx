
// import Video from "/video.png"
import Messages from "./Messages"
import Input from "./Input"
import React, { useContext } from "react";
import { ChatContext } from "../contextapi/ChatContext";



const Chat = () => {

  const { data } = useContext(ChatContext);

  return (
    <div className = 'chat'>
      <div className ="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className = "chatIcons">
        <img src="./add.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./menu.png" alt="" />
        </div>
      </div>
      <Messages />
      <Input />

    </div>
  )
}

export default Chat