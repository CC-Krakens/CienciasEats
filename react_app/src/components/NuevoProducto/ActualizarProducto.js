import React from "react";
import { useParams } from "react-router-dom";

import '../../App.css';
import ActualizarProductoForm from "./ProductoForm/ActualizarProductoForm";


const ActualizarProducto = (props) => {
    const { id } = useParams();

    
    const guardaProductoHandler = (productoIngresado) => {
        const productos = { 
            ...productoIngresado
        };
        props.onActualizarProducto(id, productos);
        
    };

    return (
        <div className="actualizar-producto">
            <ActualizarProductoForm onGuardarProducto={guardaProductoHandler} />
        </div>
    )
}

export default ActualizarProducto;