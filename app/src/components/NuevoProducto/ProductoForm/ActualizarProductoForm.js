import React, { useState } from "react";

import "../../../App.css";

const ActualizarProductoForm = (props) => {
  const [nombreIngresado, setNombreIngresado] = useState("");
  const [descripcionIngresada, setDescripcionIngresado] = useState("");
  const [precioIngresado, setPrecioIngresado] = useState("");
  const [passwordIngresado, setPasswordIngresado] = useState("");
  const [inventarioIngresado, setInventarioIngresado] = useState("");
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
  
  
  const cambioInventarioHandler = (event) => {
    setInventarioIngresado(event.target.value);
  };
  
  

  const submitHandler = (event) => {
    event.preventDefault();

  
    const producto = {
      nombre: nombreIngresado,
      descripcion: descripcionIngresada,
      precio: precioIngresado,
      password: passwordIngresado,
      inventario: inventarioIngresado,
      superUser: superUserIngresado,
    };
    
    if (
      nombreIngresado === "" ||
      descripcionIngresada === "" ||
      precioIngresado === "" ||
      inventarioIngresado === ""
    ) {
      alert("Por favor, complete todos los campos");
      return;
    }
  
    
    props.onGuardarProducto(producto);
    
    setNombreIngresado("");
    setDescripcionIngresado("");
    setPrecioIngresado("");
    setPasswordIngresado("");
    setInventarioIngresado("");
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
    <label>Inventario: </label>
    <input
      type="int"
      value={inventarioIngresado}
      onChange={cambioInventarioHandler}
    />
  </div>
 
    <div className="nuevo-producto__actions">
          <button type="submit">Actualizar producto</button>
    </div>
  </div>




    

    </form>

    






  );
};

export default ActualizarProductoForm;