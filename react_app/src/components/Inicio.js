// src/components/Inicio.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Inicio.css';

import axios from 'axios';

function Inicio() {
  const navigate = useNavigate();
    const location = useLocation();

  return (
    <div className="home-container">
      <h1>Ciencias eats</h1>
      <p>Bienvenido.</p>
      <button onClick={() => navigate('/login')}>Log In</button>
      <button onClick={() => navigate('/registro')}>Registrarse</button>
    </div>
  );
}

export default Inicio;
