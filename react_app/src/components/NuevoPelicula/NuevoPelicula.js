import React from "react";

import './NuevoPelicula.css';
import PeliculaForm from "./PeliculaForm/PeliculaForm";

const NuevoPelicula = (props) => {
    
    const guardaPeliculaHandler = (peliculaIngresado) => {
        const peliculas = { 
            ...peliculaIngresado
        };
        props.onAgregarPelicula(peliculas);
    };

    return (
        <div className="nuevo-pelicula">
            <PeliculaForm onGuardarPelicula={guardaPeliculaHandler} />
        </div>
    )
}

export default NuevoPelicula;