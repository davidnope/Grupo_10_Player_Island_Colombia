

let correoUserCookie = document.cookie? document.cookie.split('=')[1].split('%40').join('@') : '';
let alarma = document.querySelector('div.alarma')
let linkCarrito = document.querySelector('div.contenedorNotificacion a')
let mensaje= document.querySelector('#mensaje')
let punta = document.querySelector('#punta')



fetch(`http://localhost:3030/api/user/list`)
    .then(result => result.json())
    .then(data => {
        
        let idUser
        for (let i = 0; i < data.data.length; i++) { 

            data.data[i].email === correoUserCookie ? idUser = data.data[i].id : idUser = null;


        }

        if (idUser) {
            linkCarrito.setAttribute('href' , `http://localhost:3030/carrito-compras?u=${idUser}`)
            console.log(idUser)
            fetch(`http://localhost:3030/api/carrito-compras/cantidad?u=${idUser}`)
            .then(result => result.json())
            .then(data => {

                function mostrarMsj(){
                    mensaje.classList.remove('mensajeNone')
                    mensaje.classList.add('mensajeShow')
                    punta.classList.remove('puntaNone')
                    punta.classList.add('puntaShow')
                    mensaje.firstElementChild.innerText = `Tienes ${data} Productos`
                }
                function quitarMsj(){
                    mensaje.classList.remove('mensajeShow')
                    mensaje.classList.add('mensajeNone')
                    punta.classList.remove('puntaShow')
                    punta.classList.add('puntaNone')
                }

                setTimeout(mostrarMsj, 7000)
                setTimeout(quitarMsj, 15000);


                linkCarrito.addEventListener('mouseover',(e)=>{
                    mensaje.classList.remove('mensajeNone')
                    mensaje.classList.add('mensajeShow')
                    punta.classList.remove('puntaNone')
                    punta.classList.add('puntaShow')
                    mensaje.firstElementChild.innerText = `Tienes ${data} Productos`
                })
                linkCarrito.addEventListener('mouseleave',(e)=>{
                    mensaje.classList.remove('mensajeShow')
                    mensaje.classList.add('mensajeNone')
                    punta.classList.remove('puntaShow')
                    punta.classList.add('puntaNone')
                })
                
                if (data>0) {

                    alarma.classList.remove('alarma')
                    alarma.classList.add('showAlarma')
                    alarma.lastElementChild.innerText = data
                }

            })
        }else {
            function mostrarMsj(){
                mensaje.classList.remove('mensajeNone')
                mensaje.classList.add('mensajeShow')
                punta.classList.remove('puntaNone')
                punta.classList.add('puntaShow')
                mensaje.firstElementChild.innerText = `Inicia sesion para agregar al carrito`
            }
            function quitarMsj(){
                mensaje.classList.remove('mensajeShow')
                mensaje.classList.add('mensajeNone')
                punta.classList.remove('puntaShow')
                punta.classList.add('puntaNone')
            }

            setTimeout(mostrarMsj, 7000)
            setTimeout(quitarMsj, 15000);


            linkCarrito.addEventListener('mouseover',(e)=>{
                mensaje.classList.remove('mensajeNone')
                mensaje.classList.add('mensajeShow')
                punta.classList.remove('puntaNone')
                punta.classList.add('puntaShow')
                mensaje.firstElementChild.innerText = `Inicia sesion para agregar al carrito`
            })
            linkCarrito.addEventListener('mouseleave',(e)=>{
                mensaje.classList.remove('mensajeShow')
                mensaje.classList.add('mensajeNone')
                punta.classList.remove('puntaShow')
                punta.classList.add('puntaNone')
            })
            linkCarrito.addEventListener('click',(e)=>{
                e.preventDefault()
                mensaje.classList.remove('mensajeNone')
                mensaje.classList.add('mensajeShow')
                punta.classList.remove('puntaNone')
                punta.classList.add('puntaShow')
                mensaje.firstElementChild.innerText = `Inicia sesion para agregar al carrito`
            })
        }
        
       
        

        

    })

