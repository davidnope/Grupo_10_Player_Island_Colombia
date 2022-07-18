import React from "react";
import '../tableros.css';

// COMPONENTES
import PestañasTablero from '../pestañas/PestañasTablero'
import ContenedorTotales from "../contenedorTotales/ContenedorTotales";
import TarjetasEstadisticas from "../../componentesGenerales/TarjetasEstadisticas";
import TarjetaUser from "../../componentesGenerales/TarjetaUser";
import ContTarjetasConsulta from "../../componentesGenerales/ContTarjetasConsulta";
import PestProductos from './pestañasProductos/PestProductos';
import PestUltimoProductos from './pestañasProductos/PestUltimoProductos';
import PestListadoProductos from './pestañasProductos/PestListadoProductos';


// Info etiquetas
let nombreEtiquetas = ['Productos', 'Ultimo', 'Listado'];
let rutas = ['/Productos/PestProductos', '/Productos/PestUltimo', '/Productos/PestList']

// Info etiquetas

function TableroProducto(props) {
  let componente;
  switch(props.pestaña){
    case 'PestProductos': componente = <PestProductos/>
    break;
    case 'PestUltimo': componente = <PestUltimoProductos/>
    break;
    case 'PestList': componente = <PestListadoProductos/>
    break;
  }
  return (
    <div className="contenedor-tablero">
      <div className="contendor-pestaña">
        {
          nombreEtiquetas.map((nombre, i) => {
            return <PestañasTablero
              nombreEtiqueta={nombre}
              ruta = {rutas[i]}
              key={i}
            />
          })
        }
      </div>
      {
        componente
      }
    </div>
  );
}

export default TableroProducto;