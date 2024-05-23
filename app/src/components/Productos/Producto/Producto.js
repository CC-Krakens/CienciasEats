import React from "react";

import Card from '../../UI/Card';
import '../../../App.css';

const Producto = (props) => {
    return (
        <Card className='producto'>
            <div className="producto__description">
            <p>Nombre: {props.nombre}</p>
            <p>Descripcion: {props.descripcion}</p>
            <p>Precio: {props.precio}</p>
            <p>Cantidad: {props.cantidad}</p>
                <button onClick={props.onEliminar}>Eliminar</button>
            </div>
            
        </Card>
    );
}

export default Producto