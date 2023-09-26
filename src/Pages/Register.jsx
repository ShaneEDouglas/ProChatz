import React from 'react';
import { Link, Navigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { storage,db,auth } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getFirestore } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    let downloadURL;

  

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);

      // Upload the file and metadata to firestore
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed", 
        null,
        (error) => {
          console.error("Upload failed:", error);
        }, 
        async () => {  
          downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);

          await updateProfile(response.user,{
            displayName,
            photoURL: downloadURL
          });

          await setDoc(doc(db, "users", response.user.uid), {
            uid: response.user.uid,
            displayName,
            email,
            photoURL: downloadURL
          });

          await setDoc(doc(db,"userChats",response.user.uid) ,{});

          navigate("/");
        }
      );
    } catch(err) {
      console.error("Error during user creation:", err);
    }
  };

  return (
    <div className="main-container">
      <div className="form_card_wrapper">
        <span className="logo">ProChatz</span>
        <span className="Title">Register</span>

        <form onSubmit={handleSubmit}>
          <input type="text" className="RegisterUser" placeholder="Username" required />
          <input type="email" className="RegisterEmail" placeholder="Email" required />
          <input type="password" className="RegisterPassword" placeholder="Password" required />
          <input style={{display: "none"}} id="filebtn" className="filebtn" type="file" required />
          <label htmlFor="filebtn">
            <img className="uploadimgicon" src="/uploadimgicon.png" alt="Upload Icon" />
            <span className="uploadimgtext">Upload Image</span>
          </label>
          <button className="submit_register_btn" type="submit">Submit</button>
        </form>

        <p className="loginParagrapgh">Already have an Account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;