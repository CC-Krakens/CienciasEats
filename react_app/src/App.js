// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Inicio from './components/Inicio';
import Registro from './components/Registro';
import Home_Comprador from './components/Home_Comprador';
import Home_Vendedor from './components/Home_Vendedor';
import NuevoProducto from './components/NuevoProducto/NuevoProducto';
import ActualizarProducto from './components/NuevoProducto/ActualizarProducto';
import { useState } from 'react';
import axios from 'axios';


function App() {
    const [productos, setProductos] = useState([]);

    const agregarProducto = (producto) => {
        axios.post('http://localhost:5000/agregarProducto', producto, {withCredentials: true})
        .then(response => {
          console.log('Producto agregado:', response.data);
          window.location.reload();
        })
        .catch(error => {
          console.error('Error al agregar el producto:', error);
          alert("Error al agregar el producto");
      
        });  
        };

    const actualizarProducto = (id, datosActualizados) => {
        axios.put(`http://localhost:5000/actualizarProducto/${id}`, datosActualizados)
          .then(response => {
            setProductos(productos.map(producto =>
              producto.idProducto === id ? response.data : producto
            ));
            console.log('Producto actualizado:', response.data);
            window.location.reload();
          })
          .catch(error => {
            console.error('Error al actualizar el producto:', error);
            alert("Error al actualizar el producto");
          });
      };


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home_comprador" element={<Home_Comprador />} />
        <Route path="/home_vendedor" element={<Home_Vendedor productos={productos} setProductos={setProductos} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/nuevo-producto" element={<NuevoProducto onAgregarProducto={agregarProducto} />} />
        <Route path="/actualizar-producto/:id" element={<ActualizarProducto onActualizarProducto={actualizarProducto} />} />
      </Routes>
    </Router>
  );
}

export default App;