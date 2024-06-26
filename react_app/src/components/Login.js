// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import axios from 'axios';

axios.defaults.withCredentials = true;

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      if (response.data.status === 'success') {
        if(!response.data.vendedor){
          navigate('/home_comprador', {state: {username: response.data.username}}, {withCredentials: true});
        }else{
          navigate('/home_vendedor', {state: {username: response.data.username}}, {withCredentials: true});
        }
      } else {
        alert(response.data.message);
      }
      console.log(response.data);
    } catch (error) {
        alert(error);
    }
  };  

  return (
    <div className="login-container">
        <form onSubmit={handleLogin}>
            <label>
                Usuario:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
        </form>
    </div>
);

}

export default Login;
