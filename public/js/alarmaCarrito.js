
console.log(document.cookie.split('=')[1].split('%40').join('@'))
let correoUserCookie = document.cookie.split('=')[1].split('%40').join('@')
let alarma = document.querySelector('div.alarma')
let linkCarrito = document.querySelector('div.contenedorNotificacion a')


fetch(`http://localhost:3030/api/user/list`)
    .then(result => result.json())
    .then(data => {
        console.log(data.data)
        let idUser
        for (let i = 0; i < data.data.length; i++) {

            data.data[i].email === correoUserCookie ? idUser = data.data[i].id : idUser = null;


        }
        linkCarrito.setAttribute('href' , `http://localhost:3030/carrito-compras?u=${idUser}`)
        

        fetch(`http://localhost:3030/api/carrito-compras/cantidad?u=${idUser}`)
            .then(result => result.json())
            .then(data => {
                
                if (data>0) {

                    alarma.classList.remove('alarma')
                    alarma.classList.add('showAlarma')
                    alarma.lastElementChild.innerText = data
                }

            })

    })

