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

let porcentaje = (dato,total)=>{
  return ((dato*100)/total).toFixed(1)
 
}

// INFO ESTADISTICAS
let arrCompanyProducts = ['PlayStation', 'Xbox', 'Nintendo'];
let arrTipoUser = ['Vendedor', 'Comprador'];
let arrDatos = [arrCompanyProducts, arrTipoUser]
let arrTitulos = ['Cantidad Productos por Compañia', 'Cantidad Usuarios por tipo'];
// // INFO ESTADISTICAS CERRADO


function TableroGeneral() {
  const [totales, setTotales] = useState(  [ 0,0,'1M']  )
  const [porcentajes, setPorcentajes] = useState([[10,20,30],[40,50]])

  useEffect(()=>{
    
    let promesas = []

    promesas.push(fetch('http://localhost:3030/api/user/list').then(result => result.json()))
    promesas.push(fetch('http://localhost:3030/api/productos/list').then(result => result.json()))
    
    Promise.all(promesas)
    .then(result => {
      setTotales([result[0].data.length,result[1].length,'1M'])
    
      let xbox = result[1].filter(data => data.company == 'xbox')
      let playstation = result[1].filter(data => data.company == 'playstation')
      let nintendo = result[1].filter(data => data.company == 'nintendo')
      
    
      let comprador = result[0].data.filter(data => data.type_user == 'comprador')
      let vendedor = result[0].data.filter(data => data.type_user == 'vendedor' || data.type_user == 'Vendedor')
      console.log(result[0].data);
      setPorcentajes([[porcentaje(playstation.length,result[1].length),porcentaje(xbox.length,result[1].length),porcentaje(nintendo.length,result[1].length)],[porcentaje(vendedor.length,result[0].data.length),porcentaje(comprador.length,result[0].data.length)]])
    
    
    })
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
            valor= {totales}
          />
        }
        <ContTarjetasConsulta
          tarjEstadistica={arrTitulos.map((titulo, i) => {
            return <TarjetasEstadisticas
              titulo={titulo}
              datos={arrDatos[i]}
              valor={porcentajes[i]}
              key = {i}
            />
          })}
        />
      </div>
    </div>
  );
}

export default TableroGeneral;