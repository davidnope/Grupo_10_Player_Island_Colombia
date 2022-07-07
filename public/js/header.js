// HACER MEDIA QUERYS https://developer.mozilla.org/es/docs/Web/API/MediaQueryList/addListener

// SEARCH
let contenedorSearch = document.querySelector('#barraBusqueda')
let buscador = document.querySelector('#search');
let predicciones = document.querySelector('.predicciones');
let search_query;
let query = new URLSearchParams(location.search);


if (query.has('search_query')) {
    search_query = query.get('search_query');
    console.log(search)
};

if (search_query) {
    buscador.value = search_query
}

// SEARCH

fetch(`http://localhost:3030/api/productos/searchAll`)
    .then(result => {
        return result.json()
    })
    .then(listadoProducts => {
        buscador.addEventListener('focus', (e) => {
            let contador = -1
            predicciones.innerHTML = ''
            for (let i = 0; i < 5; i++) {
                if (listadoProducts[i]) {
                    console.log(buscador.value);
                    if (listadoProducts[i].toUpperCase().includes(buscador.value.toUpperCase())) {
                        // console.log(listadoProducts[i])
                        predicciones.innerHTML += `<p>${listadoProducts[i]}</p>`
                    }
                }
            }
            if (buscador.value) {
                predicciones.style.display = 'flex';
                contenedorSearch.style.borderRadius = '18px 18px 0px 0px';

            } else {
                predicciones.style.display = 'none';
                contenedorSearch.style.borderRadius = '20px 20px 20px 20px';
            }
            buscador.addEventListener('keyup', (e) => {
                if (e.key == 'Enter' && buscador.value != '') {
                    window.location.href = `http://localhost:3030/productos/results?search_query=${buscador.value.split(' ').join('+')}`
                }
                predicciones.innerHTML = ''
                for (let i = 0; i < 5; i++) {
                    if (listadoProducts[i]) {
                        if (listadoProducts[i].toUpperCase().includes(buscador.value.toUpperCase())) {
                            // console.log(listadoProducts[i])
                            predicciones.innerHTML += `<p style='pointer-events: all'>${listadoProducts[i]}</p>`
                        }
                    }
                }
                if (predicciones.innerHTML == '') {
                    predicciones.innerHTML += `<p>No hay resultados</p>`
                }
                if (buscador.value) {
                    predicciones.style.display = 'flex';
                    contenedorSearch.style.borderRadius = '18px 18px 0px 0px';

                } else {
                    predicciones.style.display = 'none';
                    contenedorSearch.style.borderRadius = '20px 20px 20px 20px';
                }
                let arrayP = document.querySelectorAll('.predicciones p');
                console.log(arrayP);


                if (e.key == 'ArrowDown' && contador < arrayP.length - 1) {
                    contador++
                }
                if (e.key == 'ArrowUp' && contador >= 0) {
                    contador--
                }
                console.log(contador);
                for (let i = 0; i < arrayP.length; i++) {
                    if (i == contador) {
                        console.log('estoy en la posicion' + i);
                        arrayP[i].style.backgroundColor = 'grey'

                    }
                    if (e.key == 'Enter' && i == contador) {
                        buscador.value = arrayP[i].outerText
                        window.location.href = `http://localhost:3030/productos/results?search_query=${buscador.value.split(' ').join('+')}`
                    }
                    arrayP[i].addEventListener('click', () => {
                        console.log('click');
                        buscador.value = arrayP[i].outerText
                    })
                }
            })
            buscador.addEventListener('blur', () => {
                predicciones.style.display = 'none';
                contenedorSearch.style.borderRadius = '20px 20px 20px 20px';
            })
        })





    }
    )

// SEARCH  CIERRE 


// IMG E ICONO USER LOGIN -LOGOUT
let iconoUser = document.querySelector('.logout');
let imgUserPeque = document.querySelector('.login');
let imgUserMenu = document.querySelectorAll('.img-profile-menu');
let infoUser = document.querySelectorAll('.detalle-usuario-menu');


// MENU DESPLEGABLE CELULAR COMPUTADOR 
let iconoMenuCompleto = document.querySelector('.barras');
let menuDesplegableComput = document.querySelectorAll('.menu-desplegable');
let menuDesplegableCelular = document.querySelector('.menu-desplegable-celular');
let containerLogin = document.querySelector('.container-login');
let containerLogout = document.querySelector('.container-logout');
let opcionesUsuarioCompu = document.querySelectorAll('.opciones-usuario');
let opcionesVendedorComprador = document.querySelectorAll('.opcion-vendedor-comprador');


// OPCIONES MENU
let contenedorImgProfile = document.querySelectorAll('.contenedor-img-profile');
let opcionPerfil = document.querySelectorAll('.opcion-mi-perfil');
let opcionInicio = document.querySelector('.opcion-inicio');
let opcionProdcutos = document.querySelector('.opcion-productos');
let opcionContacto = document.querySelector('.opcion-contacto');
let opcionSalir = document.querySelectorAll('.opcion-salir');
let iconosUser;

// SE CREA UN switch PARA SABER QUE OBJETO VA A APARECER DEPENDIENDO A LO QUE LLAMEMOS COMO PARAMETRO DE LA FUNCION
function validarUser(obj) {
    switch (obj) {
        case "iconoUser":
            iconosUser = document.querySelector('.logout')
            break;
        case "imgUserPeque":
            iconosUser = document.querySelector('.login');
            break;
    }
    myFunction(mql);
}

// FUNCION PARA PODER AGREGAR MEDIA QUERY EN JS
let mql = window.matchMedia('(min-width: 1024px)');
function myFunction(e) {
    if (e.matches) {
        iconosUser.style.display = 'flex';
    } else {
        iconosUser.style.display = 'none';
    }
}
mql.addListener(myFunction);

// FUNCION PARA PODER AGREGAR MEDIA QUERY EN JS


let contador = 0;
fetch('http://localhost:3030/api/user/list')
    .then(result => {
        return result.json()
    })
    .then(users => {

        // TRAIGO LA COKIE PARATRAER EL USUARIO
        let cookie = document.cookie.split(';');
        let cookieCompleta;

        // TRAER EL PRIMERO QUE COINCIDA CON EL MISMO NOMBRE DE LA COOKIE
        if (sessionStorage.getItem('correoUserLoginSession') == null) {
            cookie.find(obj => {
                if (obj.split('=')[0] === 'cookieRecordarUsuario' || obj.split('=')[0] === 'cookieRecordarUsuarioSession') {
                    cookieCompleta = obj;
                }
            })
        }


        // SE SEPARA LA COOKIE, SE ARREGLA EL CORREO Y LUEGO SE GUARDA EN LA VARIABLE arreglarCorreoUser
        let nombreCookie = cookieCompleta ? cookieCompleta.split('=')[0] : '';
        let correoCookie = cookieCompleta ? cookieCompleta.split('=')[1] : '';
        let arreglarCorreoUser = correoCookie ? correoCookie.replace('%40', '@') : '';
        let correoUser;


        // SE VALIDA QUE TIPO DE LOGEO REALIZO EL USUARIO Y SE GUARDA EL CORREO EN correoUser+
        if (nombreCookie == 'cookieRecordarUsuarioSession') {
            // sessionStorage.setItem('correoUserLoginSession', arreglarCorreoUser);
            sessionStorage.setItem('correoUserLoginSession', arreglarCorreoUser);
            // correoUserSession = sessionStorage.getItem('correoUserLoginSession');
            correoUser = sessionStorage.getItem('correoUserLoginSession');

        } else if (nombreCookie == 'cookieRecordarUsuario') {
            correoUser = arreglarCorreoUser;
        }
        else if (sessionStorage.getItem('correoUserLoginSession')) {
            correoUser = sessionStorage.getItem('correoUserLoginSession');
        }



        let userLogin;

        // TRAIGO TODOS LOS USUARIOS Y FILTRO POR EL QUE ESTE LOGEADO
        for (let i = 0; i < users.data.length; i++) {
            if (users.data[i].email == correoUser) {
                userLogin = users.data[i]
            }
        }

        // SI EXISTE EL USUARIO 
        if (userLogin) {
            validarUser('imgUserPeque')
            containerLogout.style.display = 'none';
            // IMG USER
            imgUserPeque.style.backgroundImage = `url(/img/users/${userLogin.img_user})`;
            // INFO USER
            for (let i = 0; i < imgUserMenu.length; i++) {
                imgUserMenu[i].style.backgroundImage = `url(/img/users/${userLogin.img_user})`;
                infoUser[i].innerHTML += `<h3>${userLogin.first_name} ${userLogin.last_name}</h3>`;
                infoUser[i].innerHTML += `<p>${userLogin.type_user}</p>`;
            }


            // OPCIONES DE MENU
            // COORREOS PARA PROBAR
            // administrador@gmail.com - ID 21 - contraseña monito1234
            // vendedor@gmail.com - ID 22
            // comprador@gmail.com - ID 23
            switch(userLogin.type_user){
                case 'Vendedor':
                    for (let i = 0; i < opcionesVendedorComprador.length; i++) {
                        opcionesVendedorComprador[i].innerHTML = '<a href="/carrito-compras" class="opcion-iniciar-sesion"><i class="fa-solid fa-cart-plus"></i><p>Compras</p></a>'
                        opcionesVendedorComprador[i].innerHTML += '<a href="/productos/agregar" class="opcion-registrarse"><i class="fa-solid fa-check-to-slot"></i><p>Vender</p></a>'
                        opcionesVendedorComprador[i].innerHTML += `<a href="/productos/listProductsUser/${userLogin.id}" class="opcion-registrarse"><i class="fa-solid fa-box-archive"></i><p>Mis productos</p></a>`
                    }
                break;
                case 'Comprador':
                    for (let i = 0; i < opcionesVendedorComprador.length; i++) {
                        opcionesVendedorComprador[i].innerHTML = '<a href="/carrito-compras" class="opcion-iniciar-sesion"><i class="fa-solid fa-house"></i><p>Compras</p></a>'
                    }
                break;
                case 'Administrador':
                    for (let i = 0; i < opcionesVendedorComprador.length; i++) {
                        opcionesVendedorComprador[i].innerHTML = '<a href="/user/list" class="opcion-iniciar-sesion"><i class="fa-solid fa-house"></i><p>Lista de usuarios</p></a>'
                    }
            }

            // OPCIONES MENU Y SUS RUTAS 
            opcionPerfil[0].setAttribute('href', `/user/profile/${userLogin.id}`)
            opcionPerfil[1].setAttribute('href', `/user/profile/${userLogin.id}`)
            opcionInicio.setAttribute('href', `/`)
            opcionProdcutos.setAttribute('href', `/productos`)
            opcionContacto.setAttribute('href', `#footer`)



        } else {
            validarUser('iconoUser')
            containerLogin.style.display = 'none';
            contenedorImgProfile.forEach(element => {
                element.style.display = 'none';
            });
            for (let i = 0; i < opcionesUsuarioCompu.length; i++) {
                opcionesUsuarioCompu[i].innerHTML = '<a href="/user/login" class="opcion-iniciar-sesion"><i class="fa-solid fa-user-check"></i><p>Iniciar sesion</p></a>'
                opcionesUsuarioCompu[i].innerHTML += '<a href="/user/register" class="opcion-registrarse"><i class="fa-solid fa-user-plus"></i><p>Registrase</p></a>'
            }
            for (let i = 0; i < opcionesVendedorComprador.length; i++) {
                opcionesVendedorComprador[i].style.display = 'none';
            }

        }


    })
    // MENUS DESPLEGADOS CIERRE

// EVENTO PARA BARRAS MENU
iconoMenuCompleto.addEventListener('click', (e) => {
    menuDesplegableCelular.classList.toggle('transicion');
})

// ELIMINAR COOKIE O SESSION
for (let i = 0; i < opcionSalir.length; i++) {

    // TRAIGO LA COKIE PARATRAER EL USUARIO
    let cookie = document.cookie.split(';');
    let cookieCompleta;

    // TRAER EL PRIMERO QUE COINCIDA CON EL MISMO NOMBRE DE LA COOKIE
        cookie.find(obj => {
            if (obj.split('=')[0] === 'cookieRecordarUsuario' || obj.split('=')[0] === 'cookieRecordarUsuarioSession') {
                cookieCompleta = obj;
            }
        })


    // SE SEPARA LA COOKIE, SE ARREGLA EL CORREO Y LUEGO SE GUARDA EN LA VARIABLE arreglarCorreoUser
    let nombreCookie = cookieCompleta ? cookieCompleta.split('=')[0] : '';
    let correoCookie = cookieCompleta ? cookieCompleta.split('=')[1] : '';

    opcionSalir[i].addEventListener('click', ()=>{
        if(nombreCookie && nombreCookie == 'cookieRecordarUsuario'){
            document.cookie = `cookieRecordarUsuario=${correoCookie}; expires=Thu, 31 Dec 2000 12:00:00 UTC; path=/;`
            location.href = 'http://localhost:3030/';
        }else if (sessionStorage.getItem('correoUserLoginSession')){
            document.cookie = `cookieRecordarUsuarioSession=${correoCookie}; expires=Thu, 31 Dec 2000 12:00:00 UTC; path=/;`
            sessionStorage.removeItem('correoUserLoginSession')
            location.href = 'http://localhost:3030/';
        }
    })

    
}




    // buscador.addEventListener('keyup', (e) => {
    //     console.log(buscador.value);
    //     if (buscador.value) {
    //         predicciones.style.display = 'flex';
    //         contenedorSearch.style.borderRadius = '18px 18px 0px 0px';

    //     } else {
    //         predicciones.style.display = 'none';
    //         contenedorSearch.style.borderRadius = '20px 20px 20px 20px';
    //     }

    //     predicciones.innerHTML = ''

    //     if (buscador.value) {
    //         fetch(`http://localhost:3030/api/productos/searchAll/${buscador.value}`)
    //         .then(result => {
    //             return result.json()
    //         })
    //         .then(listadoProducts => {

    //             console.log('Se esta presionando el ' + listadoProducts);
    //             for (let i = 0; i < 5; i++) {
    //                 if (listadoProducts[i]) {
    //                     console.log(listadoProducts[i]);
    //                     predicciones.innerHTML += `<p>${listadoProducts[i]}</p>`
    //                 }
    //             }
    //             if(predicciones.innerHTML == ''){
    //                     predicciones.innerHTML += `<p>No hay resultados</p>`
    //             }
    //         })
    //     }
    // })
