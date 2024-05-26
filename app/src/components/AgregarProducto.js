import React, { useState } from "react";

import "./App.css";

import Productos from "./components/Productos/Productos";
import NuevoProducto from "./components/NuevoProducto/NuevoProducto";

function App() {
  
  const agregarProducto = (producto) => {
    db.session.add(nuevoProducto)
    db.session.commit()
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
    <div className="App">
      <NuevoProducto onAgregarProducto={agregarProducto} />
      <Productos productos={productos} onEliminarProducto={eliminarProducto} />
    </div>
  );
}

export default App;
