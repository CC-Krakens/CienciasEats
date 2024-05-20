// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Inicio from './components/Inicio';
import Registro from './components/Registro';
import Home_Comprador from './components/Home_Comprador';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home_comprador" element={<Home_Comprador />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
