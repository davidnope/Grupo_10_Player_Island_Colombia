import React from "react";
import './barraLateral.css'
import OpcionBarraLateral from './opciones/OpcionBarraLateral'

import {Link} from 'react-router-dom';

let iconos = [<i className="fa-solid fa-chart-column"></i>, <i className="fa-solid fa-users"></i>, <i className="fa-solid fa-box-open"></i>, <i className="fa-brands fa-shopify"></i>]
let opciones = ['General', 'Usuarios', 'Productos', 'Ecommerce'];
let rutas = ['General', 'Usuarios/PestUsuario', 'Productos/PestProductos', 'Ecommerce'];

function BarraLateral(){
    return (
        <div className="barraLateral">
            <div className="datos-user">
                <div className="img-user"></div>
                <div className="info-user">
                    <h3>Kevin Bermudez</h3>
                    <p>Administrador</p>
                </div>
            </div>
            {opciones.map((opcion, i) =>{
                return opciones[i] == 'Ecommerce'  ? <a href={'http://localhost:3030'} key = {i} className = 'link-a'><OpcionBarraLateral
                icon = {iconos[i]}
                opcion = {opcion}
                /></a> :<Link to={`/${rutas[i]}`} className='links' key = {i}><OpcionBarraLateral
                icon = {iconos[i]}
                opcion = {opcion}
                /></Link> 
                
            })
            }
        </div>
    );
}

export default BarraLateral;