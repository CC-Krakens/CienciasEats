import React, { useState } from "react";

import "./App.css";


import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; 


import Productos from "./components/Productos/Productos";
import NuevoProducto from "./components/NuevoProducto/NuevoProducto";

import Peliculas from "./components/Peliculas/Peliculas";
import NuevoPelicula from "./components/NuevoPelicula/NuevoPelicula";


function App() {
  const [peliculas, setPeliculas] = useState([
    { inventario: 1, nombre: "Spiderman", genero: "Sam R.", duracion: 5 },
    { inventario: 2, nombre: "Batman", genero: "Tim Burton", duracion: 3 },
    { inventario: 3, nombre: "Inception", genero: "Christopher Nolan", duracion: 4 },
  ]);

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
  

  const agregarPelicula = (pelicula) => {
    const nuevoPelicula = [pelicula, ...peliculas];
    setPeliculas(nuevoPelicula);
    console.log(nuevoPelicula);
  };

  const eliminarPelicula = (index) => {
    const nuevaListaPeliculas = [...peliculas];
    nuevaListaPeliculas.splice(index, 1);
    setPeliculas(nuevaListaPeliculas);
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
      </div>
      <Routes>
        <Route path="/nuevo-producto" element={<NuevoProducto onAgregarProducto={agregarProducto} />} />
      </Routes>
    </Router>
  );
}

export default App;
     