import React, { useEffect, useState } from "react";

import "./App.css";


import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; 


import Productos from "./components/Productos/Productos";
import NuevoProducto from "./components/NuevoProducto/NuevoProducto";

import axios from 'axios';


function App() {

  const [productos, setProductos] = useState([
    {
      nombre: "Pizza",
      descripcion: "Pizza grande de pepperoni",
      precio: 180,
      cantidad: 9,
    },
    {
      nombre: "Pantalón",
      descripcion: "Pantalón de mezclilla talla grande",
      precio: 240,
      cantidad: 1
    },
    {
      nombre: "Peluche",
      descripcion: "Peluche de Pikachu",
      precio: 80,
      cantidad: 15
    },
  ]);


  useEffect(() => {
    axios.get('http://localhost:5000/productos')
      .then(response => setProductos(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const agregarProducto = (producto) => {
    const nuevoProducto = [producto, ...productos];
    setProductos(nuevoProducto);
    console.log(nuevoProducto);
  };

  const eliminarProducto = (index) => {
    const nuevaListaProductos = [...productos];
    nuevaListaProductos.splice(index, 1);
    setProductos(nuevaListaProductos);
  };
  




  

  return (
    
    <Router>
      <div>
      <Productos productos={productos} onEliminarProducto={eliminarProducto} />
      </div>
      <div>
        <div className="nuevo-alumno__actions">
          <Link to="/nuevo-producto">
            <button type="button">Agregar producto</button>
          </Link>
        </div>
        <div className="App">
      <h1>Lista de Productos</h1>
      <ul>
        {productos.map(producto => (
          <li key={producto.idProducto}>
            {producto.nombre} - ${producto.precio}
          </li>
        ))}
      </ul>
    </div>
      </div>
      <Routes>
        <Route path="/nuevo-producto" element={<NuevoProducto onAgregarProducto={agregarProducto} />} />
      </Routes>
    </Router>
  );
}

export default App;
     