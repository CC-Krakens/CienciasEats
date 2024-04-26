// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

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
        navigate('/home', {state: {username: response.data.user_id}});
      } else {
        alert(response.data.message);
      }
      console.log(response.data);
    } catch (error) {
        alert(error);
    }
  };  

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
