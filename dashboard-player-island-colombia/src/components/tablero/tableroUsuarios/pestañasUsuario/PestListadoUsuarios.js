import React from "react";
import { useState } from "react";
import '../../pestañasTableros.css'




// COMPONENTES
import TarjetaGrandeDescription from "../../../componentesGenerales/TarjetaGrandeDescription";
import TarjetaList from "../../../componentesGenerales/TarjetaList";

function PestListadoUsuarios(props) {
  let infoTarjetaTitulos = {
    uno:'Nombre:',
    dos:'Email:',
    tres: 'Telefono:',
    cuatro: 'Direccion:'
  } 

  const [infoTarjetaDescripcion,setInfoTarjetaDescripcion] = useState(null);
  const getInfoUser = (id) =>{
    let user = props.listUser.find(item => item.id===id)
    debugger
    if (user) {
      let infotarjetica = {
          producto: user.name,
          imagen: user.img_principal,
          datosUser: `${user.first_name.split(' ')[0]} ${user.last_name}`,
          company: user.email,
          precio: user.phone_number,
          stock:  user.adress
        }
        
        setInfoTarjetaDescripcion(infotarjetica)
      
    }
    
  }



  return (
      <div className="info-tablero">
         <h2>Listado de usuarios</h2>
        <div className="info-tablero-row">
        {
          infoTarjetaDescripcion && <TarjetaGrandeDescription
          /* datosDescription1 = {props.infoTarjetaTitulos} */
          titulos = {infoTarjetaTitulos}
          datosDescription = {infoTarjetaDescripcion}
        />
        }
        <TarjetaList 
          id = {props.listUser.map((user,i)=>{
            return <p className="colum-id" key={i}>{user.id}</p>
          })}
          nombre ={props.listUser.map((user,i)=>{
            return <p className="colum-name" key={i} onClick = {()=>{getInfoUser(user.id)}} >{`${user.first_name.split(' ')[0]} ${user.last_name}`} </p>
          })}
          tipo1 = 'Email'
          datoTipo1 = {props.listUser.map((user,i)=>{
            return <p className="colum-email" key={i}>{user.email}</p>
          })}
          tipo2 = 'Tipo usuario'
          datoTipo2 = {props.listUser.map((user,i)=>{
            return <p className="colum-typeUser" key={i}>{user.type_user}</p>
          })}
        />
        </div>
    </div>
  );
}

export default PestListadoUsuarios;