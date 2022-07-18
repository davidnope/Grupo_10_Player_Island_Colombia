import React from "react";
import '../tableros.css'

// COMPONENTES
import PestañasTablero from '../pestañas/PestañasTablero'
import ContenedorTotales from "../contenedorTotales/ContenedorTotales";
import TarjetasEstadisticas from "../../componentesGenerales/TarjetasEstadisticas";
import TarjetaUser from "../../componentesGenerales/TarjetaUser";
import ContTarjetasConsulta from "../../componentesGenerales/ContTarjetasConsulta";
import {useState, useEffect} from "react";
// Info Tarjetas totales
let iconos = [<i className="fa-solid fa-user-check"></i>, <i className="fa-solid fa-dolly"></i>, <i className="fa-solid fa-eye"></i>]
let titulos = ['Usuarios registrados', 'Productos en venta', 'Visitas a la página']
// Info etiquetas CERRADO

// INFO ESTADISTICAS
let arrCompanyProducts = ['PlayStation', 'Xbox', 'Nintendo'];
let arrTipoUser = ['Vendedor', 'Comprador'];
let arrDatos = [arrCompanyProducts, arrTipoUser]
let arrTitulos = ['Cantidad Productos por Compañia', 'Cantidad Usuarios por tipo'];
// // INFO ESTADISTICAS CERRADO


function TableroGeneral() {
  const [datos, setDatos] = useState(
  [
    [0,0,'1M'],[[10,20,50], [40,30]]
  ]
  )

  useEffect(async()=>{
    let consulta = await fetch('http://localhost:3030/api/user/list')
    consulta = await consulta.json()
    console.log(consulta.data.length);
  }, [])

  return (
    <div className="contenedor-tablero">
      <div className="contendor-pestaña">
        <PestañasTablero nombreEtiqueta= 'General' />
      </div>

      <div className="info-tablero">
        {
          <ContenedorTotales
            titulos={titulos}
            iconos={iconos}
            valor= {datos[0]}
          />
        }
        <ContTarjetasConsulta
          tarjEstadistica={arrTitulos.map((titulo, i) => {
            return <TarjetasEstadisticas
              titulo={titulo}
              datos={arrDatos[i]}
              valor={datos[1][i]}
              key = {i}
            />
          })}
        />
      </div>
    </div>
  );
}

export default TableroGeneral;