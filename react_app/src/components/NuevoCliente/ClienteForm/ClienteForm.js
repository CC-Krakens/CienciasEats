import React, { useState } from "react";

import "./ClienteForm.css";

const ClienteForm = (props) => {
  const [nombreIngresado, setNombreIngresado] = useState("");
  const [apellidoPaternoIngresado, setApellidoPaternoIngresado] = useState("");
  const [apellidoMaternoIngresado, setApellidoMaternoIngresado] = useState("");
  const [passwordIngresado, setPasswordIngresado] = useState("");
  const [emailIngresado, setEmailIngresado] = useState("");
  const [superUserIngresado, setSuperUserIngresado] = useState(false);


  const cambioNombreHandler = (event) => {
    setNombreIngresado(event.target.value);
  };

  const cambioApellidoPaternoHandler = (event) => {
    setApellidoPaternoIngresado(event.target.value);
  };
  
  const cambioApellidoMaternoHandler = (event) => {
    setApellidoMaternoIngresado(event.target.value);
  };
  
  const cambioPasswordHandler = (event) => {
    setPasswordIngresado(event.target.value);
  };
  
  const cambioEmailHandler = (event) => {
    setEmailIngresado(event.target.value);
  };
  
  const cambioSuperUserHandler = (event) => {
    setSuperUserIngresado(event.target.checked);
  };
  

  const submitHandler = (event) => {
    event.preventDefault();
  
    const cliente = {
      nombre: nombreIngresado,
      apellidoPaterno: apellidoPaternoIngresado,
      apellidoMaterno: apellidoMaternoIngresado,
      password: passwordIngresado,
      email: emailIngresado,
      superUser: superUserIngresado,
    };
    
    if (
      nombreIngresado === "" ||
      apellidoPaternoIngresado === "" ||
      apellidoMaternoIngresado === "" ||
      passwordIngresado === "" ||
      emailIngresado === ""
    ) {
      alert("Por favor, complete todos los campos");
      return;
    }
  
    props.onGuardarCliente(cliente);
    
    setNombreIngresado("");
    setApellidoPaternoIngresado("");
    setApellidoMaternoIngresado("");
    setPasswordIngresado("");
    setEmailIngresado("");
    setSuperUserIngresado(false);
  };
  

  return (
    <form onSubmit={submitHandler}>
      <div className="nuevo-cliente__controls">
        <div className="nuevo-cliente__control">
          <label>Nombre: </label>
          <input
            type="text"
            value={nombreIngresado}
            onChange={cambioNombreHandler}
          />
        </div>
        <div className="nuevo-cliente__control">
  <label>Apellido Paterno: </label>
  <input
    type="text"
    value={apellidoPaternoIngresado}
    onChange={cambioApellidoPaternoHandler}
  />
</div>
  <div className="nuevo-cliente__control">
    <label>Apellido Materno: </label>
    <input
      type="text"
      value={apellidoMaternoIngresado}
      onChange={cambioApellidoMaternoHandler}
    />
  </div>
  <div className="nuevo-cliente__control">
    <label>Contraseña: </label>
    <input
      type="password"
      value={passwordIngresado}
      onChange={cambioPasswordHandler}
    />
  </div>
  <div className="nuevo-cliente__control">
    <label>Email: </label>
    <input
      type="email"
      value={emailIngresado}
      onChange={cambioEmailHandler}
    />
  </div>
  <div className="nuevo-cliente__control">
    <label>Superusuario: </label>
    <input
      type="checkbox"
      checked={superUserIngresado}
      onChange={cambioSuperUserHandler}
    />
    <div className="nuevo-alumno__actions">
          <button type="submit">Agregar alumno</button>
    </div>
  </div>

      </div>



    

    </form>

    






  );
};

export default ClienteForm;
