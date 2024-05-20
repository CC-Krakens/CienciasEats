// src/components/Home_Comprador.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';

import axios from 'axios';

function Home_Comprador() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const location = useLocation();
  const username = location.state.username;
  
  useEffect(() => {
    const buscarProductos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
  
    buscarProductos();
  }, []);
  

  return (
    <div className="home-container">
      <h1>Ciencias eats</h1>
      <p>Bienvenido, {username}.</p>
      <p>Disfrute su compra</p>
      <ul>
        {productos.map((producto) => (
          <li key={producto.idProducto}>
            {producto.nombre} - ${producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home_Comprador;
