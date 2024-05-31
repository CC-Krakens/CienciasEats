import React from "react";

import Card from '../../UI/Card';
import './Cliente.css';

const Cliente = (props) => {
    return (
        <Card className='cliente'>
            <div className="cliente__description">
            <p>Nombre: {props.nombre}</p>
            <p>Apellido Paterno: {props.apellidoPaterno}</p>
            <p>Apellido Materno: {props.apellidoMaterno}</p>
            <p>Contraseña: {props.password}</p>
            <p>Email: {props.email}</p>
            <p>Superusuario: {props.superUser ? "Sí" : "No"}</p>
                <button onClick={props.onEliminar}>Eliminar</button>
            </div>
            
        </Card>
    );
}

export default Cliente