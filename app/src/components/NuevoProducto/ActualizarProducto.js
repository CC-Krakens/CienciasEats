import React from "react";
import { useParams } from "react-router-dom";

import '../../App.css';
import ProductoForm from "./ProductoForm/ProductoForm";


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
            <ProductoForm onGuardarProducto={guardaProductoHandler} />
        </div>
    )
}

export default ActualizarProducto;