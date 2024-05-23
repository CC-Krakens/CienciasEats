import React from "react";

import Card from '../UI/Card';
import Producto from "./Producto/Producto";
import '../../App.css';

const Productos = (props) => {  

    const eliminarProductoHandler = (index) => {
        props.onEliminarProducto(index);
    };
 

    return (
        <div>
            <Card className='productos'>
                {props.productos.map((producto, index) => (
                    <Producto
                        key={index}
                        nombre={producto.nombre}
                        descripcion={producto.descripcion}
                        precio={producto.precio}
                        password={producto.password}
                        cantidad={producto.cantidad}
                        superUser={producto.superUser}
                        onEliminar={() => eliminarProductoHandler(index)}

                    />
                ))}
            </Card>
        </div>
    );
};



export default Productos;