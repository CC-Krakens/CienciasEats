import React from "react";

import '../../App.css';
import ProductoForm from "./ProductoForm/ProductoForm";

const NuevoProducto = (props) => {
    
    const guardaProductoHandler = (productoIngresado) => {
        const productos = { 
            ...productoIngresado
        };
        props.onAgregarProducto(productos);
    };

    return (
        <div className="nuevo-producto">
            <ProductoForm onGuardarProducto={guardaProductoHandler} />
        </div>
    )
}

export default NuevoProducto;