import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"






const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    
   
  
    try {
     await signInWithEmailAndPassword(auth, email, password);
  
     navigate('/');
  
  
     
    } catch(err) {
      console.error("Error during user creation:", err);
    }
  };
  
  return (
    <div className ="main-container">
        <div className = "form_card_wrapper">
            <span className="logo">ProChatz</span>
            <span className = "Title"> Login</span>
            <form onSubmit={handleSubmit}>
                <input type ="email" className="LoginEmail" placeholder ="Email"/>
                <input type ="password" className="LoginPassword" placeholder = "Password"/>
                <input style = {{display: "none"}} id="filebtn" className="filebtn" type ="file"/>
                <label htmlFor = "filebtn">
                  <img className="uploadimgicon" src="/uploadimgicon.png" alt =""/>
                  <span className="uploadimgtext">Upload Image</span>
                </label>
                <button className="submit_register_btn">Submit</button>
            </form>
            <p className = "loginParagrapgh"> Don't have an Accont?<Link to ="/register"> Register</Link></p>
        </div>
    </div>
  )
}


export default Login