import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../contextapi/Context'

const Navbar = () => {

  const {currentUser} = useContext(AuthContext)
  return (
    <div className ='navbar'>
     <span className="nav-logo">ProChatz</span>
     <div className="user">
        <img className="user-img" src={currentUser.photoURL} alt=""/>
        <span className="user-name">{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)} className="logout">logout</button>

     </div>
    </div>
  )
}

export default Navbar