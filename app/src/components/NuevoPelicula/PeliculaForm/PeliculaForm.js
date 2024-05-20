import React, { useState } from "react";

import "./PeliculaForm.css";

const PeliculaForm = (props) => {
  const [nombreIngresado, setNombreIngresado] = useState("");
  const [generoIngresado, setGeneroIngresado] = useState("");
  const [duracionIngresado, setDuracionIngresado] = useState("");
  const [inventarioIngresado, setInventarioIngresado] = useState("");
  const [emailIngresado, setEmailIngresado] = useState("");
  const [superUserIngresado, setSuperUserIngresado] = useState(false);


  const cambioNombreHandler = (event) => {
    setNombreIngresado(event.target.value);
  };

  const cambioGeneroHandler = (event) => {
    setGeneroIngresado(event.target.value);
  };
  
  const cambioDuracionHandler = (event) => {
    setDuracionIngresado(event.target.value);
  };
  
  const cambioInventarioHandler = (event) => {
    setInventarioIngresado(event.target.value);
  };
  
  const cambioEmailHandler = (event) => {
    setEmailIngresado(event.target.value);
  };
  
  const cambioSuperUserHandler = (event) => {
    setSuperUserIngresado(event.target.checked);
  };
  

  const submitHandler = (event) => {
    event.preventDefault();
  
    const pelicula = {
      nombre: nombreIngresado,
      genero: generoIngresado,
      duracion: duracionIngresado,
      inventario: inventarioIngresado,
      email: emailIngresado,
      superUser: superUserIngresado,
    };
    
    if (
      nombreIngresado === "" ||
      generoIngresado === "" ||
      duracionIngresado === "" ||
      inventarioIngresado === ""
          ) {
      alert("Por favor, complete todos los campos");
      return;
    }
  
    props.onGuardarPelicula(pelicula);
    
    setNombreIngresado("");
    setGeneroIngresado("");
    setDuracionIngresado("");
    setInventarioIngresado("");
    setEmailIngresado("");
    setSuperUserIngresado(false);
  };
  

  return (
    <form onSubmit={submitHandler}>
      <div className="nuevo-pelicula__controls">
        <div className="nuevo-pelicula__control">
          <label>Nombre: </label>
          <input
            type="text"
            value={nombreIngresado}
            onChange={cambioNombreHandler}
          />
        </div>
        <div className="nuevo-pelicula__control">
  <label>Género: </label>
  <input
    type="text"
    value={generoIngresado}
    onChange={cambioGeneroHandler}
  />
</div>
  <div className="nuevo-pelicula__control">
    <label>Duración: </label>
    <input
      type="text"
      value={duracionIngresado}
      onChange={cambioDuracionHandler}
    />
  </div>
  <div className="nuevo-pelicula__control">
    <label>Inventario: </label>
    <input
      type="text"
      value={inventarioIngresado}
      onChange={cambioInventarioHandler}
    />
  </div>
  
  
    <div className="nuevo-pelicula__actions">
          <button type="submit">Agregar película</button>
    </div>
  </div>




    

    </form>

    






  );
};

export default PeliculaForm;
