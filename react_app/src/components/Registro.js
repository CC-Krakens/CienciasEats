// src/components/Registro.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registro.css';

import axios from 'axios';

function Registro() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [vendedor, setVendedor] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/registro', {
        username,
        telefono,
        correo,
        password,
        vendedor,
      });
      if (response.data.status === 'success') {
        alert('Usuario registrado exitosamente');
        navigate('/login');
      } else {
        alert(response.data.message);
      }
      console.log(response.data);
    } catch (error) {
        alert(error.response.data.message);
    }
  };  

  return (
    <div className="login-container">
        <form onSubmit={handleRegister}>
            <label>
                Nombre de Usuario:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Correo:
                <input type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </label>
            <label>
                Teléfono:
                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                Vendedor
                <input type="checkbox" checked={vendedor} onChange={(e) => setVendedor(e.target.checked)} />
            </label>
            <button type="submit">Login</button>
        </form>
    </div>
);

}

export default Registro;
