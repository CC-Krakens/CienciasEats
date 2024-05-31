import React, { useState } from "react";

import "../../../App.css";

import { useNavigate } from "react-router-dom";

const ProductoForm = (props) => {
  const [nombreIngresado, setNombreIngresado] = useState("");
  const [descripcionIngresada, setDescripcionIngresado] = useState("");
  const [categoriaIngresada, setCategoriaIngresado] = useState("");
  const [precioIngresado, setPrecioIngresado] = useState("");
  const [inventarioIngresado, setInventarioIngresado] = useState("");
  const [fotoIngresada, setFotoIngresada] = useState(""); 
  const navigate = useNavigate();

  const cambioNombreHandler = (event) => {
    setNombreIngresado(event.target.value);
  };

  const cambioDescripcionHandler = (event) => {
    setDescripcionIngresado(event.target.value);
  };

  const cambioCategoriaHandler = (event) => {
    setCategoriaIngresado(event.target.value);
  };
  
  const cambioPrecioHandler = (event) => {
    setPrecioIngresado(event.target.value);
  };
  
  
  const cambioInventarioHandler = (event) => {
    setInventarioIngresado(event.target.value);
  };

  const cambioFotoHandler = (event) => {
    setFotoIngresada(event.target.value);
  };
  
  

  const submitHandler = (event) => {
    event.preventDefault();

  
    const producto = {
      nombre: nombreIngresado,
      descripcion: descripcionIngresada,
      categoria: categoriaIngresada,
      precio: precioIngresado,
      inventario: inventarioIngresado,
      foto: fotoIngresada,
    };
    
    if (
      nombreIngresado === "" ||
      descripcionIngresada === "" ||
      categoriaIngresada === "" ||
      precioIngresado === "" ||
      inventarioIngresado === ""
    ) {
      alert("Por favor, complete todos los campos");
      return;
    }
  
    
    props.onGuardarProducto(producto);
    
    setNombreIngresado("");
    setDescripcionIngresado("");
    setCategoriaIngresado("");
    setPrecioIngresado("");
    setInventarioIngresado("");
    setFotoIngresada("");


    navigate("/");
    
  };
  

  return (
    <form onSubmit={submitHandler}>
      <div className="nuevo-producto__controls">
        <div className="nuevo-producto__control">
          <label>Nombre: </label>
          <input
            type="text"
            value={nombreIngresado}
            onChange={cambioNombreHandler}
          />
        </div>
        <div className="nuevo-producto__control">
  <label>Descripción: </label>
  <input
    type="text"
    value={descripcionIngresada}
    onChange={cambioDescripcionHandler}
  />
  <label>Categoría: </label>
  <input
    type="text"
    value={categoriaIngresada}
    onChange={cambioCategoriaHandler}
  />
</div>
  <div className="nuevo-producto__control">
    <label>Precio: </label>
    <input
      type="text"
      value={precioIngresado}
      onChange={cambioPrecioHandler}
    />
  </div>
  
  <div className="nuevo-producto__control">
    <label>Inventario: </label>
    <input
      type="text"
      value={inventarioIngresado}
      onChange={cambioInventarioHandler}
    />
  </div>

  <div className="nuevo-producto__control">
    <label>Foto: </label>
    <input
      type="text"
      value={fotoIngresada}
      onChange={cambioFotoHandler}
    />
  </div>
 
 
    <div className="nuevo-producto__actions">
            <button type="submit">Agregar producto</button>
    </div>
  </div>




    

    </form>

    






  );
};

export default ProductoForm;
