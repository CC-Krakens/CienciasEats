import React, { useEffect, useState } from "react";

import "./App.css";


import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; 


import Productos from "./components/Productos/Productos";
import NuevoProducto from "./components/NuevoProducto/NuevoProducto";

import axios from 'axios';


function App() {

  const [productos, setProductos] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5000/productos')
      .then(response => setProductos(response.data))
      .catch(error => console.error('No se encontraron productos:', error));
  }, []);

  const agregarProducto = (producto) => {

  axios.post('http://localhost:5000/agregarProducto', producto)
  .then(response => {
    console.log('Producto agregado:', response.data);
  })
  .catch(error => {
    console.error('Error al agregar el producto:', error);
  });

  };


  
  const eliminarProducto = (id) => {
    const nuevaListaProductos = [...productos];
    nuevaListaProductos.splice(id, 1);
    setProductos(nuevaListaProductos);

    axios.delete(`http://localhost:5000/eliminarProducto/${id}`)
      .then(response => {
        setProductos(productos.filter(producto => producto.idProducto !== id));
        console.log('Producto eliminado:', response.data);
      })
      .catch(error => {
        console.error('Error al eliminar el producto:', error);
      });
  };





  

  return (
    
    <Router>
      <div>
      {productos.map(producto => (
          <li key={producto.idProducto}>
            <div>{producto.nombre}</div> 
            <div>{producto.descripcion}</div>  
            <div>{producto.precio}</div> 
            <div>{producto.cantidad}</div> 
            <button onClick={() => eliminarProducto(producto.idProducto)}>Eliminar</button>
          </li>
        ))}
      </div>
      <div>
        <div className="nuevo-alumno__actions">
          <Link to="/nuevo-producto">
            <button type="button">Agregar producto</button>
          </Link>
        </div>
        <div className="App">
    </div>
      </div>
      <Routes>
        <Route path="/nuevo-producto" element={<NuevoProducto onAgregarProducto={agregarProducto} />} />
      </Routes>
    </Router>
  );
}

export default App;
     