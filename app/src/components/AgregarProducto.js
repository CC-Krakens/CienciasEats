import React, { useState } from "react";

import "./AgregarProducto.css";

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
      nombre: "Fernando",
      descripcion: "Fong",
      password: 313320679,
    },
    {
      nombre: "Valeria",
      descripcion: "Garcia",
      password: 314006088,
    },
    {
      nombre: "Erick",
      descripcion: "Martinez",
      password: 414890123,
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
    <div className="App">
      <NuevoProducto onAgregarProducto={agregarProducto} />
      <Productos productos={productos} onEliminarProducto={eliminarProducto} />

      <NuevoPelicula onAgregarPelicula={agregarPelicula} />
      <Peliculas peliculas={peliculas} onEliminarPelicula={eliminarPelicula} />
    </div>
  );
}

export default App;
