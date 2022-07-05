// HACER MEDIA QUERYS https://developer.mozilla.org/es/docs/Web/API/MediaQueryList/addListener




    // SEARCH
    let contenedorSearch = document.querySelector('#barraBusqueda')
    let buscador = document.querySelector('#search');
    let predicciones = document.querySelector('.predicciones');
    let search_query;
    let query = new URLSearchParams(location.search);
    console.log(document.querySelector('#header'))


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
    let menuDesplegableCelular = document.querySelector('.menu-desplegable-celular');
    let containerLogin = document.querySelector('.container-login');
    let opcionesUsuarioCompu = document.querySelectorAll('.opciones-usuario');


    // OPCIONES MENU
    let opcionPerfil = document.querySelectorAll('.opcion-mi-perfil');
    let opcionInicio = document.querySelector('.opcion-inicio');
    let opcionProdcutos = document.querySelector('.opcion-productos');
    let opcionContacto = document.querySelector('.opcion-contacto');
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
            if(sessionStorage.getItem('correoUserLoginLocal') == null){
                cookie.find(obj => {
                    if (obj.split('=')[0] === 'cookieRecordarUsuario' || obj.split('=')[0] === 'cookieRecordarUsuarioSession') {
                        console.log('entre');
                        cookieCompleta = obj;
                    }
                    // switch(obj.split('=')[0]){
                    //     case 'cookieRecordarUsuario':
                    //         arr = arr.push(obj);
                    //     break;
                    //     case 'cookieRecordarUsuarioSession':
                    //         arr = arr.push(obj);
                    //         break;
                    // }
                })
            }



            let nombreCookie = cookieCompleta ? cookieCompleta.split('=')[0] : '';
            let correoCookie = cookieCompleta ? cookieCompleta.split('=')[1] : '';
            let arreglarCorreoUser = correoCookie ? correoCookie.replace('%40', '@') : '';
            let correoUser;

            if (nombreCookie == 'cookieRecordarUsuarioSession') {
                // sessionStorage.setItem('correoUserLoginSession', arreglarCorreoUser);
                sessionStorage.setItem('correoUserLoginLocal', arreglarCorreoUser);
                // correoUserSession = sessionStorage.getItem('correoUserLoginSession');
                correoUser = sessionStorage.getItem('correoUserLoginLocal');

            } else if (nombreCookie == 'cookieRecordarUsuario') {
                correoUser = arreglarCorreoUser;
            } 
            else if(sessionStorage.getItem('correoUserLoginLocal')){
                correoUser = sessionStorage.getItem('correoUserLoginLocal');
            }

            let userLogin;

            // TRAIGO TODOS LOS USUARIOS Y FILTRO POR EL QUE ESTE LOGEADO
            for (let i = 0; i < users.data.length; i++) {
                if (users.data[i].email == correoUser) {
                    userLogin = users.data[i]
                }
            }

            iconoMenuCompleto.addEventListener('click', (e) => {
                menuDesplegableCelular.classList.toggle('transicion');
            })
            // SI EXISTE EL USUARIO 
            if (userLogin) {
                validarUser('imgUserPeque')
                // IMG USER
                imgUserPeque.style.backgroundImage = `url(/img/users/${userLogin.img_user})`;
                // INFO USER
                for (let i = 0; i < imgUserMenu.length; i++) {
                    imgUserMenu[i].style.backgroundImage = `url(/img/users/${userLogin.img_user})`;
                    infoUser[i].innerHTML += `<h3>${userLogin.first_name} ${userLogin.last_name}</h3>`;
                    infoUser[i].innerHTML += `<p>${userLogin.type_user}</p>`;
                }

                // OPCIONES MENU Y SUS RUTAS 
                // opcionPerfil[0].setAttribute('href',`/user/profile/${userLogin.id}`)
                // opcionPerfil[1].setAttribute('href',`/user/profile/${userLogin.id}`)
                // opcionInicio.setAttribute('href',`/`)
                // opcionProdcutos.setAttribute('href',`/productos`)
                // opcionContacto.setAttribute('href',`#footer`)

            } else {
                containerLogin.style.display = 'none';
                validarUser('iconoUser')
                for (let i = 0; i < opcionesUsuarioCompu.length; i++) {
                    opcionesUsuarioCompu[i].innerHTML = '<a href="#" class="opcion-iniciar-sesion"><i class="fa-solid fa-user-check"></i><p>Iniciar sesion</p></a>'
                    opcionesUsuarioCompu[i].innerHTML += '<a href="#" class="opcion-registrarse"><i class="fa-solid fa-user-plus"></i><p>Registrase</p></a>'
                }

            }


        })
    // MENUS DESPLEGADOS CIERRE








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
