import React from "react";

import Card from '../UI/Card';
import Producto from "./Producto/Producto";
import '../../App.css';

const Productos = (props) => {  

    const eliminarProductoHandler = (index) => {
        props.onEliminarProducto(index);
    };

    const actualizarProductoHandler = (index) => {
        props.onActualizarProducto(index);
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
                        inventario={producto.inventario}
                        foto={producto.foto}
                        onEliminar={() => eliminarProductoHandler(index)}
                        onActualizar={() => actualizarProductoHandler(index)}

                    />
                ))}
            </Card>
        </div>
    );
};



export default Productos;