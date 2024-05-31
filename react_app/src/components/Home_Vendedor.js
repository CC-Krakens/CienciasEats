import React, { useEffect, useState } from "react";

import './styles.css';


import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; 


import NuevoProducto from "./components/NuevoProducto/NuevoProducto";
import ActualizarProducto from "./components/NuevoProducto/ActualizarProducto";


import axios from 'axios';

function Home_Vendedor() {

  const [productos, setProductos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");



  useEffect(() => {
    axios.get('http://localhost:5000/productos')
      .then(response => setProductos(response.data))
      .catch(error => console.error('No se encontraron productos:', error));
  }, []);

  const agregarProducto = (producto) => {

  axios.post('http://localhost:5000/agregarProducto', producto)
  .then(response => {
    console.log('Producto agregado:', response.data);
    setErrorMessage(""); 
  })
  .catch(error => {
    console.error('Error al agregar el producto:', error);
    alert("Error al agregar el producto");

  });


  };


  
  const eliminarProducto = (id) => {
    const nuevaListaProductos = [...productos];
    nuevaListaProductos.splice(id, 1);
    setProductos(nuevaListaProductos);

    axios.delete(`http://localhost:5000/eliminarProducto/${id}`)
      .then(response => {
        setProductos(productos.filter(producto => producto.idProducto !== id));
        console.log('Producto eliminado:', response.data);
      })
      .catch(error => {
        console.error('Error al eliminar el producto:', error);
      });
  };


  const actualizarProducto = (id, datosActualizados) => {
    axios.put(`http://localhost:5000/actualizarProducto/${id}`, datosActualizados)
      .then(response => {
        setProductos(productos.map(producto =>
          producto.idProducto === id ? response.data : producto
        ));
        console.log('Producto actualizado:', response.data);
      })
      .catch(error => {
        console.error('Error al actualizar el producto:', error);
      });
  };



  

  return (
    
    <Router>
      <div>
      {productos.map(producto => (
          <li key={producto.idProducto}>
            <div>{producto.nombre}</div> 
            <div>{producto.descripcion}</div>  
            <div>{producto.precio}</div> 
            <div>{producto.inventario}</div> 
            <button onClick={() => eliminarProducto(producto.idProducto)}>Eliminar</button>

            <div className="actualizar-producto__actions">
            <Link to={`/actualizar-producto/${producto.idProducto}`}>
                <button type="button">Actualizar producto</button>
              </Link>
        </div>
          </li>
        ))}
      </div>
      <div>
        <div className="nuevo-producto__actions">
          <Link to="/nuevo-producto">
            <button type="button">Agregar producto</button>
          </Link>
        </div>
        <div className="App">
    </div>
      </div>
      <Routes>
        <Route path="/nuevo-producto" element={<NuevoProducto onAgregarProducto={agregarProducto} />} />
        <Route path="/actualizar-producto/:id" element={<ActualizarProducto onActualizarProducto={actualizarProducto} />} />
      </Routes>
    </Router>
  );
}

export default Home_Vendedor;
     