import React from "react";

import Card from '../UI/Card';
import Pelicula from "./Pelicula/Pelicula";
import './Peliculas.css';

const Peliculas = (props) => {  

    const eliminarPeliculaHandler = (index) => {
        props.onEliminarPelicula(index);
    };
 

    return (
        <div>
            <Card className='peliculas'>
                {props.peliculas.map((pelicula, index) => (
                    <Pelicula
                        key={index}
                        nombre={pelicula.nombre}
                        genero={pelicula.genero}
                        duracion={pelicula.duracion}
                        inventario={pelicula.inventario}
                        email={pelicula.email}
                        superUser={pelicula.superUser}
                        onEliminar={() => eliminarPeliculaHandler(index)}

                    />
                ))}
            </Card>
        </div>
    );
};



export default Peliculas;