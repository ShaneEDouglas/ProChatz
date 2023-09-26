import React from 'react'
import Sidebar from '../componenets/Sidebar'
import Chat from '../componenets/Chat'

const Home = () => {
  return (
    <div className="home">
      <div className="home-main-container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home