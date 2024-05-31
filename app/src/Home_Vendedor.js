import React, { useEffect, useState } from "react";

import "./App.css";


import { BrowserRouter as Router, Route, Routes, Link, resolvePath } from "react-router-dom"; 


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
    window.location.reload();

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
        window.location.reload();

      })
      .catch(error => {
        console.error('Error al actualizar el producto:', error);
        alert("Error al actualizar el producto");

      });
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {
        withCredentials: true,
      });
    } catch (error) {
        alert(error);
    }
    navigate('/');
  };
  

  return (
    
    <Router>

      <div>
      <button className="Logout" onClick={() => handleComprar(producto.idProducto)}>Comprar</button>
      {productos.map(producto => (
          <li key={producto.idProducto}>
            <div>Nombre: {producto.nombre}</div> 
            <div>Descripción: {producto.descripcion}</div> 
            <div>Categoría: {producto.categoria}</div>  
            <div>Precio: {producto.precio}</div> 
            <div>Inventario: {producto.inventario}</div> 
            
            <div>
            <img
      src={producto.foto}
      className="img-thumbnail"
      />
      </div>
                        
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
     