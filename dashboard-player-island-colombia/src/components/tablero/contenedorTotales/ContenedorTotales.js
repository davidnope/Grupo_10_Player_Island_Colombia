import React from "react";
import './contenedorTotales.css';
import TarjetaTotal from './tarjetaTotal/TarjetaTotal'


function ContenedorTotales(props) {
    return (
      <div className="contenedorTotal">
          {
            props.titulos.map((titulo, i)=>{
              return  <TarjetaTotal
              titulos = {titulo}
              iconos = {props.iconos[i]}
              valor = {props.valor[i]}
              key = {i}
              />
            })
          }
      </div>
    );
  }
  
  export default ContenedorTotales;