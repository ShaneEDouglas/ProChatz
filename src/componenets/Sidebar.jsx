import React from 'react'
import Navbar from '../componenets/Navbar'
import Search from './Search'
import UserChats from './UserChats';

const Sidebar = () => {
  return (
    <div className ='sidebar'>
      <Navbar />
      <Search />
      <UserChats/>
      
    </div>
  )
}

export default Sidebar