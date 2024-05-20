import React, { useState } from "react";

import "./ProductoForm.css";

const ProductoForm = (props) => {
  const [nombreIngresado, setNombreIngresado] = useState("");
  const [descripcionIngresada, setDescripcionIngresado] = useState("");
  const [precioIngresado, setPrecioIngresado] = useState("");
  const [passwordIngresado, setPasswordIngresado] = useState("");
  const [cantidadIngresado, setCantidadIngresado] = useState("");
  const [superUserIngresado, setSuperUserIngresado] = useState(false);


  const cambioNombreHandler = (event) => {
    setNombreIngresado(event.target.value);
  };

  const cambioDescripcionHandler = (event) => {
    setDescripcionIngresado(event.target.value);
  };
  
  const cambioPrecioHandler = (event) => {
    setPrecioIngresado(event.target.value);
  };
  
  const cambioPasswordHandler = (event) => {
    setPasswordIngresado(event.target.value);
  };
  
  const cambioCantidadHandler = (event) => {
    setCantidadIngresado(event.target.value);
  };
  
  const cambioSuperUserHandler = (event) => {
    setSuperUserIngresado(event.target.checked);
  };
  

  const submitHandler = (event) => {
    event.preventDefault();
  
    const producto = {
      nombre: nombreIngresado,
      descripcion: descripcionIngresada,
      precio: precioIngresado,
      password: passwordIngresado,
      cantidad: cantidadIngresado,
      superUser: superUserIngresado,
    };
    
    if (
      nombreIngresado === "" ||
      descripcionIngresada === "" ||
      precioIngresado === "" ||
      cantidadIngresado === ""
    ) {
      alert("Por favor, complete todos los campos");
      return;
    }
  
    props.onGuardarProducto(producto);
    
    setNombreIngresado("");
    setDescripcionIngresado("");
    setPrecioIngresado("");
    setPasswordIngresado("");
    setCantidadIngresado("");
    setSuperUserIngresado(false);
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
</div>
  <div className="nuevo-producto__control">
    <label>Precio: </label>
    <input
      type="float"
      value={precioIngresado}
      onChange={cambioPrecioHandler}
    />
  </div>
  
  <div className="nuevo-producto__control">
    <label>Cantidad: </label>
    <input
      type="int"
      value={cantidadIngresado}
      onChange={cambioCantidadHandler}
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
