import React from "react";

import Card from '../UI/Card';
import Cliente from "./Cliente/Cliente";
import './Clientes.css';

const Clientes = (props) => {  

    const eliminarClienteHandler = (index) => {
        props.onEliminarCliente(index);
    };
 

    return (
        <div>
            <Card className='clientes'>
                {props.clientes.map((cliente, index) => (
                    <Cliente
                        key={index}
                        nombre={cliente.nombre}
                        apellidoPaterno={cliente.apellidoPaterno}
                        apellidoMaterno={cliente.apellidoMaterno}
                        password={cliente.password}
                        email={cliente.email}
                        superUser={cliente.superUser}
                        onEliminar={() => eliminarClienteHandler(index)}

                    />
                ))}
            </Card>
        </div>
    );
};



export default Clientes;