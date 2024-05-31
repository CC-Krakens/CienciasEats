import React from "react";

import './NuevoCliente.css';
import ClienteForm from "./ClienteForm/ClienteForm";

const NuevoCliente = (props) => {
    
    const guardaClienteHandler = (clienteIngresado) => {
        const clientes = { 
            ...clienteIngresado
        };
        props.onAgregarCliente(clientes);
    };

    return (
        <div className="nuevo-cliente">
            <ClienteForm onGuardarCliente={guardaClienteHandler} />
        </div>
    )
}

export default NuevoCliente;