import React, { useContext, useState } from "react";
import Img from "./uploadimgicon.png";
import Attach from "./clip.png";
import { AuthContext } from "../contextapi/Context";
import { ChatContext } from "../contextapi/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if(isSending) return;

    setIsSending(true);
    try {
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          (error) => {
            console.error("Error uploading image:", error);
            setIsSending(false);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
            updateChatDocs();
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
        updateChatDocs();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setIsSending(false);
  };

  // const handleSend = async () => {
  //   if(isSending) return;
  
  //   setIsSending(true);
  //   try {
  //     if (img) {
  //       const storageRef = ref(storage, uuid());
  //       const uploadTask = uploadBytesResumable(storageRef, img);
  
  //       uploadTask.on('state_changed', 
  //         (snapshot) => {
  //           // Handle progress, errors, and completion here.
  //         },
  //         (error) => {
  //           console.error("Error uploading image:", error);
  //           setIsSending(false);
  //         },
  //         async () => {
  //           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  //           await updateDoc(doc(db, "chats", data.chatId), {
  //             messages: arrayUnion({
  //               id: uuid(),
  //               text,
  //               senderId: currentUser.uid,
  //               date: Timestamp.now(),
  //               img: downloadURL,
  //             }),
  //           });
  //           updateChatDocs();
  //         }
  //       );
  //     } else {
  //       await updateDoc(doc(db, "chats", data.chatId), {
  //         messages: arrayUnion({
  //           id: uuid(),
  //           text,
  //           senderId: currentUser.uid,
  //           date: Timestamp.now(),
  //         }),
  //       });
  //       updateChatDocs();
  //     }
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  
  //   setIsSending(false);
  // };

  const updateChatDocs = async () => {
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="Input-container">
      <input 
        className= "main-input"
        type="text"
        placeholder="Type a message or Something"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt=""/>
        <input 
          type="file"
          style={{display: "none"}}
          id="fileinputbtn"
          className="fileinputbtn" 
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="fileinputbtn"> 
          <img src={Img} alt="" />
        </label>
        <button 
          className="sendbtn"
          onClick={handleSend}
          disabled={isSending}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Input;