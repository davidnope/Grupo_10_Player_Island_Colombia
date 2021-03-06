import React from "react";
import '../../tableros.css'

// COMPONENTES
import ContenedorTotales from "../../contenedorTotales/ContenedorTotales";
import TarjetasEstadisticas from "../../../componentesGenerales/TarjetasEstadisticas";
import TarjetaUser from "../../../componentesGenerales/TarjetaUser";
import ContTarjetasConsulta from "../../../componentesGenerales/ContTarjetasConsulta";


// Info Tarjetas totales
let iconos = [<i className="fa-solid fa-id-card"></i>, <i className="fa-solid fa-hand-holding-dollar"></i>, <i className="fa-solid fa-address-book"></i>]
let titulos = ['Usuarios - Tipo vendedor', 'Usuarios - Tipo comprador', 'Total de usuarios']
// Info etiquetas CERRADO

// INFO ESTADISTICAS
let arrTipoUser = ['Vendedor', 'Comprador'];
let arrDatos = [arrTipoUser]
let arrTitulos = ['Cantidad Usuarios por tipo'];
// INFO ESTADISTICAS CERRADO

function PestUsuario(props) {
  /* console.log(props.porcentajes); */
  return (
      <div className="info-tablero info-tablero-colum">
        {
          <ContenedorTotales
            titulos={titulos}
            iconos={iconos}
            valor={props.valorTotales}
          />
        }
        <ContTarjetasConsulta
        tarjUser = {<TarjetaUser/>}
          tarjEstadistica={arrTitulos.map((titulo, i) => {
            return <TarjetasEstadisticas
              titulo='Cantidad Usuarios por tipo'
              datos={arrDatos[i]}
              valor={props.porcentajes}
              key = {i}
            />
          })}
        />
    </div>
  );
}

export default PestUsuario;



{/* <ContTarjetasConsulta
          tarjEstadistica={arrTitulos.map((titulo, i) => {
            return <TarjetasEstadisticas
              titulo={titulo}
              datos={arrDatos[i]}
              key = {i}
            />
          })}
          tarjUser = {<TarjetaUser/>}
        /> */}