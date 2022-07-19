import React from "react";
import './cssGenerales/contTarjetasUnicoPr.css'
import imageUser from '../../img/productos/holas_img__consola_1658204276319.jpg'

const imagenUsuario = require.context('../../img/productos', true);

function ContTarjetasUnicoPr(props) {
  let variable = `./${props.imgProducto}`
  let img = {background: `url(${imagenUsuario(variable)})`,
  backgroundSize: 'cover',
  backgrounPosition: 'center'}
  console.log(props);
  return (
      <div className="contTarjetasUnicoPr">
            <div className="contImgProductoGrande">
            <h2>{props.nombre}</h2>
            <div className="ImgProductoGrande" style={img}></div>
            </div>
            <div className="contInfoProductoUnico">
              <div className="contTexts">
              <b>Descripcion del producto:</b>
                <p>{props.descripcion}</p>
              </div>
              <div className="contTexts">
              <b>Stock disponible:</b>
                <p>{props.stock}</p>
              </div>
              <div className="contTexts">
              <b>Precio:</b>
                <p>{props.precio}</p>
              </div>
              <div className="contTexts">
              <b>Caracteristicas:</b>
                <p>{props.caracteristicas}</p>
              </div>
            </div>
      </div>
  );
}

export default ContTarjetasUnicoPr;