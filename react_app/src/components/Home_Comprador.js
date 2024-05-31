// src/components/Home_Comprador.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';
import axios from 'axios';

axios.defaults.withCredentials = true;

function Home_Comprador() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const location = useLocation();
  const username = location.state.username;
  
  useEffect(() => {
    const buscarProductos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/productos', {withCredentials: true});
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
  
    buscarProductos();
  }, []);
  

  const handleComprar = async (producto_id) => {
    try {
      await axios.post('http://localhost:5000/comprar', {
        producto_id,
      }, {
        withCredentials: true,
      });
      alert('Gracias por su compra. El vendedor se pondrá en contacto con usted.');
    } catch (error) {
      console.error('Error al comprar el producto:', error);
      alert('No se pudo comprar el producto. Intente de nuevo.');
    }
  };

  return (
    <div className="home-container">
      <h1>Ciencias eats</h1>
      <p>Bienvenido, {username}.</p>
      <p>Disfrute su compra</p>
      <ul>
        {productos.map((producto) => (
          <li key={producto.idProducto}>
            {producto.nombre} - ${producto.precio}
            <button onClick={() => handleComprar(producto.idProducto)}>Comprar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home_Comprador;