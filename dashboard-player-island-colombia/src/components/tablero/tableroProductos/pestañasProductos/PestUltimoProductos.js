import React from "react";
import '../../tableros.css';
import '../../pestañasTableros.css';


import ContTarjetasUnicoPr from '../../../componentesGenerales/ContTarjetasUnicoPr'

function PestUltimoProductos(props) {
  console.log(props);
  return (
      <div className="info-tablero">
        <h2>Ultimo producto creado</h2>
          <ContTarjetasUnicoPr
            imgProducto = {props.ultimoProducto.img_principal}
            nombre = {props.ultimoProducto.name}
            descripcion = {props.ultimoProducto.description}
            stock = {props.ultimoProducto.stock}
            precio = {props.ultimoProducto.price}
            caracteristicas = {props.ultimoProducto.features}
          />
      </div>
  );
}

export default PestUltimoProductos;