import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contextapi/Context";
import { ChatContext } from "../contextapi/ChatContext";
import { db } from "../firebase";

const UserChats = () => {

  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div>
       {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div className="user-chat"
        key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img className="search-img" src={chat[1].userInfo.photoURL}alt=""/>
          <div className ="user-status" >
          <span className ="search-text">{chat[1].userInfo.displayName}</span>
          <p className="chat-time">{chat[1].lastMessage?.text}</p>
          </div>
        </div>

    ))}
    </div>
  );
};

export default UserChats