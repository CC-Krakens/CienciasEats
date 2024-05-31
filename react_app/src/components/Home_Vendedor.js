import React, { useEffect, useState } from "react";
import './styles.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; 
import NuevoProducto from "./NuevoProducto/NuevoProducto";
import ActualizarProducto from "./NuevoProducto/ActualizarProducto";
import axios from 'axios';

axios.defaults.withCredentials = true;

function Home_Vendedor(props) {

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

  return (
    
    <div className="home-container">
      <div>
      {props.productos.map(producto => (
          <li key={producto.idProducto}>
            <div>{producto.nombre}</div> 
            <div>{producto.descripcion}</div>  
            <div>{producto.precio}</div> 
            <div>{producto.inventario}</div> 
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
     