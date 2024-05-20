// src/components/Home_Comprador.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';

import axios from 'axios';

function Home_Comprador() {
  const navigate = useNavigate();
    const location = useLocation();
    const username = location.state.username;

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {
        withCredentials: true,
      });
    } catch (error) {
        alert(error);
    }
    navigate('/');
  };

  return (
    <div className="home-container">
      <h1>Ciencias eats</h1>
      <p>Bienvenido, {username}</p>
      <p>Disfrute su compra</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Home_Comprador;
