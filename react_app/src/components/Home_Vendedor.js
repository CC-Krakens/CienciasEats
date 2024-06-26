import React, { useEffect, useState } from "react";
import './styles.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

function Home_Vendedor(props) {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/productos')
      .then(response => props.setProductos(response.data))
      .catch(error => console.error('No se encontraron productos:', error));
  }, []);


  const eliminarProducto = (id) => {
    const nuevaListaProductos = [...props.productos];
    nuevaListaProductos.splice(id, 1);
    props.setProductos(nuevaListaProductos);

    axios.delete(`http://localhost:5000/eliminarProducto/${id}`)
      .then(response => {
        props.setProductos(props.productos.filter(producto => producto.idProducto !== id));
        console.log('Producto eliminado:', response.data);
      })
      .catch(error => {
        console.error('Error al eliminar el producto:', error);
      });
  };

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
    
    <div className="home">
      <button onClick={handleLogout}>Log Out</button>
      <div>
      <h2>Tus productos</h2>
      {props.productos.map(producto => (
          <li key={producto.idProducto}>
          <div>Nombre: {producto.nombre}</div> 
          <div>Descripción: {producto.descripcion}</div> 
          <div>Categoría: {producto.categoria}</div>  
          <div>Precio: ${producto.precio}</div> 
          <div>Inventario: {producto.inventario}</div> 
          
          <div>
          <img
    src={producto.foto}
    className="img-thumbnail"
    />
    </div>
            <button onClick={() => eliminarProducto(producto.idProducto)}>Eliminar</button>

            <div className="actualizar-producto__actions">
            <Link to={`/actualizar-producto/${producto.idProducto}`}>
                <button type="button">Actualizar producto</button>
              </Link>
        </div>
          </li>
        ))}
      </div>
      <div>
        <div className="nuevo-producto__actions">
          <Link to="/nuevo-producto">
            <button type="button">Agregar producto</button>
          </Link>
        </div>
        <div className="App">
    </div>
      </div>
    </div>
  );
}

export default Home_Vendedor;
     