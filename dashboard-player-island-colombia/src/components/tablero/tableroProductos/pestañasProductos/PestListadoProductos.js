import React, { useEffect, useState } from "react";
import '../../pestañasTableros.css'
import { Link } from 'react-router-dom';



// COMPONENTES
import TarjetaGrandeDescription from "../../../componentesGenerales/TarjetaGrandeDescription";
import TarjetaList from "../../../componentesGenerales/TarjetaList";

function PestListadoProductos(props) {

  let infoTarjetaTitulos = {
    uno:'Usuario:',
    dos:'Compañia:',
    tres: 'Precio:',
    cuatro: 'Stock:'
  }   
  const [infoTarjetaDescripcion,setInfoTarjetaDescripcion] = useState(null);
  const getInfoUser = (id) =>{
    let producto = props.listProductos.find(item => item.id===id)
    if (producto) {
      let user = props.listUsuarios.find(item=> item.id == producto.user_id)
      if(user){
        let infotarjetica = {
          producto: producto.name,
          imagen: producto.img_principal,
          datosUser: `${user.id} - ${user.first_name}`,
          company: producto.company,
          precio: producto.price,
          stock:  producto.stock
        }
        
        setInfoTarjetaDescripcion(infotarjetica)
      }
    }
    
  }

  return (
      <div className="info-tablero">
         <h2>Listado de productos</h2>
        <div className="info-tablero-row">
        {
          infoTarjetaDescripcion && <TarjetaGrandeDescription
          /* datosDescription1 = {props.infoTarjetaTitulos} */
          titulos = {infoTarjetaTitulos}
          datosDescription = {infoTarjetaDescripcion}
        />
        }
        
        <TarjetaList 
          id = {props.listProductos.map((producto,i)=>{
            return <p className="colum-id" key={i}>{producto.id}</p>
          })}
          nombre ={props.listProductos.map((producto,i)=>{
            return <p className="colum-name" key={i} onClick = {()=>{getInfoUser(producto.id)}}>{producto.name}</p>
          })}
          tipo1 = 'Compañia'
          datoTipo1 = {props.listProductos.map((producto,i)=>{
            return <p className="colum-email" key={i}>{producto.company}</p>
          })}
          tipo2 = 'Categoria'
          datoTipo2 = {props.listProductos.map((producto,i)=>{
            return <p className="colum-typeUser" key={i}>{producto.category}</p>
          })}
        />
        </div>
      </div>
  );
}

export default PestListadoProductos;