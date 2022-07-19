import React from "react";
import './App.css';
import BarraLateral from './components/barraLateral/BarraLateral';

// RUTAS
import Tablero from './components/Tablero';
import ListUser from './components/tablero/tableroUsuarios/pestañasUsuario/PestListadoUsuarios';


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className='container-app'>
      <BarraLateral />
      <Routes>
        <Route path="/"
        element={<Navigate to="/General" replace />}
          />
        <Route path="/General" element={<Tablero identificador={1} />} />
        <Route path="/Productos/PestProductos" element={<Tablero identificador={3} pestaña = {'PestProductos'} />} />
        <Route path="/Productos/PestUltimo" element={<Tablero identificador={3} pestaña = {'PestUltimo'} />} />
        <Route  path="/Productos/PestListProducts" element={<Tablero identificador={3} pestaña = {'PestListProducts'} />} />
        {/* <Route  path="/Productos/PestListProducts/:id" element={<Tablero identificador={3} pestaña = {'PestListProducts/:id'} />} /> */}
        <Route path="/Usuarios/PestUsuario" element={<Tablero identificador={2} pestaña={'PestUsuario'}/>} />
        <Route path="/Usuarios/PestListadoUser" element={<Tablero identificador={2} pestaña={'PestListadoUser'} />} />
        {/* <Route path="/Usuarios/PestListadoUser/:id" element={<Tablero identificador={2} pestaña={'PestListadoUser/:id'} />} /> */}
      </Routes>
    </div>
  );
}

export default App;
