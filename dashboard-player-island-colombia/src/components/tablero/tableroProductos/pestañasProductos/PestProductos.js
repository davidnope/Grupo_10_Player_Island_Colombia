import React from "react";
import '../../tableros.css';

// COMPONENTES
import ContenedorTotales from "../../contenedorTotales/ContenedorTotales";
import TarjetasEstadisticas from "../../../componentesGenerales/TarjetasEstadisticas";
import ContTarjetasConsulta from "../../../componentesGenerales/ContTarjetasConsulta";


// Info Tarjetas totales
let iconos = [<i className="fa-solid fa-people-carry-box"></i>, <i className="fa-solid fa-cart-plus"></i>, <i className="fa-solid fa-box-open"></i>]
let titulos = ['Total vendidos', 'Cantidad de carritos', 'Total de productos']
// Info etiquetas CERRADO

// INFO ESTADISTICAS
let arrCompanyProducts = ['PlayStation', 'Xbox', 'Nintendo'];
let arrCharactersProducts = ['Consolas', 'Controles', 'Especiales', 'Accesorios'];
let arrDatos = [arrCompanyProducts, arrCharactersProducts]
let arrTitulos = ['Cantidad Productos por Compañia', 'Cantidad Usuarios por tipo'];
// // INFO ESTADISTICAS CERRADO


function TableroProducto(props) {
  return (
      <div className="info-tablero">
        {
          <ContenedorTotales
            titulos={titulos}
            iconos={iconos}
          />
        }
        <ContTarjetasConsulta
          tarjEstadistica={arrTitulos.map((titulo, i) => {
            return <TarjetasEstadisticas
              titulo={titulo}
              datos={arrDatos[i]}
              key = {i}
            />
          })}
        />

      </div>
  );
}

export default TableroProducto;