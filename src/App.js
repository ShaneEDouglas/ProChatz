import React, { useContext } from 'react';
import './style.scss';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from './contextapi/Context';

function App() {

  const {currentUser} = useContext(AuthContext);

  const ProtectRoute = ({children})=>{
    if (!currentUser) {
      return <Navigate to="/login" />;
    } 
      return children;
    
  };
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

console.log(process.env)
export default App;
