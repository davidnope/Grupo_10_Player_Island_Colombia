window.addEventListener('load', ()=>{

// let botonVendedor = document.querySelector('#boton-vendedor');
// let botonComprador = document.querySelector('#boton-comprador');
let botones = document.querySelectorAll('.style-boton');

let contenedorVendedor = document.querySelector('.contenedor-vendedor');
let contenedorComprador = document.querySelector('.contenedor-comprador');

let usuarios = document.querySelectorAll('.usuario');
let contenedorImg = document.querySelectorAll('.contenedor-img')

// let contenedorImgUsers = document.querySelector('')
// BOTONES VENDEDOR Y COMPRADOR 
botones.forEach((boton, i) =>{
    boton.addEventListener('click', (e) => {
        let indice = i;
        if(indice == 0){
            contenedorVendedor.style.display = 'flex';
            contenedorComprador.style.display = 'none';
            botones[0].classList.add('boton-seleccionado');
            botones[1].classList.remove('boton-seleccionado');
        }else if(indice == 1){
            contenedorComprador.style.display = 'flex';
            contenedorVendedor.style.display = 'none';
            botones[1].classList.add('boton-seleccionado');
            botones[0].classList.remove('boton-seleccionado');
        }
        
    })
})

// fetch('http://localhost:3030/api/user/list')
// .then(result => {
//     return result.json()
// })
// .then(list => {
//     for(let i = 0; i < list.data.length; i++){
        
//     }
//     console.log(list.data);
//     console.log(usuarios);
// })
})