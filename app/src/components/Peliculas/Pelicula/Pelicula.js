import React from "react";

import Card from '../../UI/Card';
import './Pelicula.css';

const Pelicula = (props) => {
    return (
        <Card className='pelicula'>
            <div className="pelicula__description">
            <p>Nombre: {props.nombre}</p>
            <p>Género: {props.genero}</p>
            <p>Duración: {props.duracion}</p>
            <p>Inventario: {props.inventario}</p>
                <button onClick={props.onEliminar}>Eliminar</button>
            </div>
            
        </Card>
    );
}

export default Pelicula