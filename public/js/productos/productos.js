window.onload = () => {
    let filtroCompany
    let filtroCategory = []
    let filtroPrecio
    let filtroColor = []


    let query = new URLSearchParams(location.search);
    
    if (query.has('company')) {
        filtroCompany = query.get('company')
    }
    if (query.has('ct')) {
        filtroCategory = query.get('ct').split(' ')
    }

    if (query.has('pr')) {
        filtroPrecio = query.get('pr')
        
    }

    if (query.has('cl')) {
        filtroColor = query.get('cl').split(' ')
        
    }

    const play = document.querySelector('.play')
    const xbox = document.querySelector('.xbox ')
    const nintendo = document.querySelector('.nintendo ')
    const formularioFiltros = document.querySelector('#filtros')
    const btnReset =document.querySelector('#btnReset')

    filtroCompany == 'playstation' ? play.classList.add('selected') : filtroCompany == 'xbox' ? xbox.classList.add('selected') : filtroCompany == 'nintendo' ? nintendo.classList.add('selected') : null;;;

    //filtros de categoria - cerrar
    location.search == ''? btnReset.classList.remove('show'): btnReset.classList.add('show') ;
    btnReset.addEventListener('click',(e)=> location.href= '/productos')

    for (let i = 0; i < formularioFiltros.categoria.length; i++) {


        if (filtroCategory.includes(formularioFiltros.categoria[i].value)) {
            formularioFiltros.categoria[i].setAttribute('checked', '')
        }

        
        formularioFiltros.categoria[i].addEventListener('click', (e) => {
            let url = location.href


            if (filtroPrecio || filtroColor.length != 0) {
                if (filtroPrecio && filtroColor.length != 0) {
                    console.log(`existen ambos ${filtroPrecio, filtroCategory}`);
                    urlct = url.split('cl=')[0]
                    urlcl = url.split('cl=')[1].split('&pr=')[0]
                    urlpr = url.split('pr=')[1]
                    console.log(urlct, urlcl, urlpr);
                    {

                        if (filtroCategory.includes(formularioFiltros.categoria[i].value)) {
                            if (filtroCategory.length == 1) {
                                window.location.href = `http://localhost:3030/productos/results?cl=${urlcl}&pr=${urlpr}`
                            } else {
                                let filtrosNuevos = filtroCategory.filter((filtro) => {
                                    return filtro != formularioFiltros.categoria[i].value
                                })
                                filtrosNuevos = filtrosNuevos.join('+')
                                window.location.href = `http://localhost:3030/productos/results?ct=${filtrosNuevos}&cl=${urlcl}&pr=${urlpr}`
                            }
                        } else {
                            if (query.has('ct')) {
                                url = url.split('&cl')[0]
                                window.location.href = `${url}+${formularioFiltros.categoria[i].value}&cl=${urlcl}&pr=${urlpr}`
                            } else {
                                window.location.href = `http://localhost:3030/productos/results?ct=${formularioFiltros.categoria[i].value}&cl=${urlcl}&pr=${urlpr}`
                            }
                        }
                    }
                } else if (filtroPrecio && filtroColor.length == 0) {
                    console.log(`existen ambos ${filtroPrecio, filtroCategory}`);
                    url = url.split('pr=')[0]

                    console.log(url)
                    console.log(filtroPrecio);
                    if (filtroCategory.includes(formularioFiltros.categoria[i].value)) {
                        if (filtroCategory.length == 1) {
                            window.location.href = `http://localhost:3030/productos/results?pr=${filtroPrecio}`
                        } else {
                            let filtrosNuevos = filtroCategory.filter((filtro) => {
                                return filtro != formularioFiltros.categoria[i].value
                            })
                            filtrosNuevos = filtrosNuevos.join('+')
                            window.location.href = `http://localhost:3030/productos/results?ct=${filtrosNuevos}&pr=${filtroPrecio}`
                        }
                    } else {
                        if (query.has('ct')) {
                            url = url.split('&')[0]
                            window.location.href = `${url}+${formularioFiltros.categoria[i].value}&pr=${filtroPrecio}`
                        } else {
                            window.location.href = `http://localhost:3030/productos/results?ct=${formularioFiltros.categoria[i].value}&pr=${filtroPrecio}`
                        }
                    }
                } else if (!filtroPrecio && filtroColor.length != 0) {
                    console.log(`existen ambos ${filtroPrecio, filtroCategory}`);
                    
                    urlcl = url.split('cl=')[1]
                    console.log(urlcl)
                    
                    console.log(filtroColor);
                    if (filtroCategory.includes(formularioFiltros.categoria[i].value)) {
                        if (filtroCategory.length == 1) {
                            window.location.href = `http://localhost:3030/productos/results?cl=${urlcl}`
                        } else {
                            let filtrosNuevos = filtroCategory.filter((filtro) => {
                                return filtro != formularioFiltros.categoria[i].value
                            })
                            filtrosNuevos = filtrosNuevos.join('+')
                            window.location.href = `http://localhost:3030/productos/results?ct=${filtrosNuevos}&cl=${urlcl}`
                        }
                    } else {
                        if (query.has('ct')) {
                            url = url.split('&')[0]
                            window.location.href = `${url}+${formularioFiltros.categoria[i].value}&cl=${urlcl}`
                        } else {
                            window.location.href = `http://localhost:3030/productos/results?ct=${formularioFiltros.categoria[i].value}&cl=${urlcl}`
                        }
                    }

                }
            } else {
                if (filtroCategory.includes(formularioFiltros.categoria[i].value)) {
                    if (filtroCategory.length == 1) {
                        window.location.href = `http://localhost:3030/productos`
                    } else {
                        let filtrosNuevos = filtroCategory.filter((filtro) => {
                            return filtro != formularioFiltros.categoria[i].value
                        })
                        filtrosNuevos = filtrosNuevos.join('+')
                        window.location.href = `http://localhost:3030/productos/results?ct=${filtrosNuevos}`
                    }
                } else {
                    if (query.has('ct')) {
                        window.location.href = `${url}+${formularioFiltros.categoria[i].value}`
                    } else {
                        window.location.href = `http://localhost:3030/productos/results?ct=${formularioFiltros.categoria[i].value}`
                    }
                }
            }




        })

    }


    //filtros de categoria 

    //filtros de precio


    for (let i = 0; i < formularioFiltros.precio.length; i++) {


        if (filtroPrecio == formularioFiltros.precio[i].value) {
            formularioFiltros.precio[i].setAttribute('checked', '')

        }

        formularioFiltros.precio[i].addEventListener('click', (e) => {

            if (filtroCategory.length != 0 && filtroColor.length != 0) {
                let url = location.href
                urlct = url.split('ct=')[1].split('&cl=')[0]
                urlcl = url.split('cl=')[1].split('&pr=')[0]
                urlpr = url.split('pr=')[1]
                console.log(urlct, urlcl, urlpr);
                {

                    if (filtroPrecio) {
                        if (filtroPrecio == formularioFiltros.precio[i].value) {
                            window.location.href = `http://localhost:3030/productos/results?ct=${urlct}&cl=${urlcl}`
                        } else {
                            url = location.href.split('&pr=')[0]
                            window.location.href = `${url}&pr=${formularioFiltros.precio[i].value}`
                        }
                    } else {
                        window.location.href = `${url}&pr=${formularioFiltros.precio[i].value}`
                    }
                }
            } else if (filtroCategory.length != 0 && filtroColor.length == 0) {
                let url = location.href
                urlct = url.split('ct=')[1].split('&pr=')[0]

                urlpr = url.split('pr=')[1]
                console.log(urlct, urlpr);
                {

                    if (filtroPrecio) {
                        if (filtroPrecio == formularioFiltros.precio[i].value) {
                            window.location.href = `http://localhost:3030/productos/results?ct=${urlct}`
                        } else {
                            url = location.href.split('&pr=')[0]
                            window.location.href = `${url}&pr=${formularioFiltros.precio[i].value}`
                        }
                    } else {
                        window.location.href = `${url}&pr=${formularioFiltros.precio[i].value}`
                    }
                }
            } else if (filtroCategory.length == 0 && filtroColor.length != 0) {
                let url = location.href

                urlcl = url.split('cl=')[1].split('&pr=')[0]
                urlpr = url.split('pr=')[1]
                console.log(urlcl, urlpr);
                {

                    if (filtroPrecio) {
                        if (filtroPrecio == formularioFiltros.precio[i].value) {
                            window.location.href = `http://localhost:3030/productos/results?cl=${urlcl}`
                        } else {
                            url = location.href.split('&pr=')[0]
                            window.location.href = `${url}&pr=${formularioFiltros.precio[i].value}`
                        }
                    } else {
                        window.location.href = `${url}&pr=${formularioFiltros.precio[i].value}`
                    }

                }

                /* {if (filtroCategory.length>0) {
                let url = location.href
                if (filtroPrecio) {
                   if (filtroPrecio==formularioFiltros.precio[i].value) {
                    window.location.href = url.split('&pr=')[0]
                   }else{
                    url = url.split('&pr=')[0]
                    window.location.href = `${url}&pr=${formularioFiltros.precio[i].value}`
                   }
                }else{
                    window.location.href = `${url}&pr=${formularioFiltros.precio[i].value}`
    
                }
               }else{
                    if (filtroPrecio==formularioFiltros.precio[i].value) {
                        window.location.href = `http://localhost:3030/productos`
                    }else{
                        window.location.href = `http://localhost:3030/productos/results?pr=${formularioFiltros.precio[i].value}`
                        
                    }
               }} */
            } else {
                if (filtroPrecio) {
                    if (filtroPrecio == formularioFiltros.precio[i].value) {
                        window.location.href = `http://localhost:3030/productos`
                    } else {
                        url = location.href.split('pr=')[0]
                        window.location.href = `${url}pr=${formularioFiltros.precio[i].value}`
                    }
                } else {
                    window.location.href = `http://localhost:3030/productos/results?pr=${formularioFiltros.precio[i].value}`
                }


            }

        })
    }
    //filtros de precio

    //filtros color

    for (let i = 0; i < formularioFiltros.color.length; i++) {


        if (filtroColor.includes(formularioFiltros.color[i].value)) {
            formularioFiltros.color[i].setAttribute('checked', '')
        }

        /* console.log(formularioFiltros.color[i], `este es el numero ${i}`); */

        formularioFiltros.color[i].addEventListener('click', (e) => {
            let url = location.href

            console.log('hice click');
            if (filtroPrecio && filtroCategory.length != 0) {
                let url = location.href
                urlct = url.split('ct=')[1].split('&')[0]
                
                urlpr = url.split('pr=')[1]
                console.log(urlct,  urlpr);
                {

                    if (filtroColor.includes(formularioFiltros.color[i].value)) {
                        if (filtroColor.length == 1) {
                            window.location.href = `http://localhost:3030/productos/results?ct=${urlct}&pr=${urlpr}`
                        } else {
                            let filtrosNuevos = filtroColor.filter((filtro) => {
                                return filtro != formularioFiltros.color[i].value
                            })
                            filtrosNuevos = filtrosNuevos.join('+')
                            window.location.href = `http://localhost:3030/productos/results?ct=${urlct}&cl=${filtrosNuevos}&pr=${urlpr}`
                        }
                    } else {
                        if (query.has('cl')) {
                            url = url.split('&pr')[0]
                            window.location.href = `${url}+${formularioFiltros.color[i].value}&pr=${urlpr}`
                        } else {
                            window.location.href = `http://localhost:3030/productos/results?ct=${urlct}&cl=${formularioFiltros.color[i].value}&pr=${urlpr}`
                        }
                    }
                }
            } else if (filtroPrecio && filtroCategory.length == 0) {
                let url = location.href
                
                
                urlpr = url.split('pr=')[1]
                console.log( urlpr);
                {

                    if (filtroColor.includes(formularioFiltros.color[i].value)) {
                        if (filtroColor.length == 1) {
                            window.location.href = `http://localhost:3030/productos/results?pr=${urlpr}`
                        } else {
                            let filtrosNuevos = filtroColor.filter((filtro) => {
                                return filtro != formularioFiltros.color[i].value
                            })
                            filtrosNuevos = filtrosNuevos.join('+')
                            window.location.href = `http://localhost:3030/productos/results?cl=${filtrosNuevos}&pr=${urlpr}`
                        }
                    } else {
                        if (query.has('cl')) {
                            url = url.split('&pr')[0]
                            window.location.href = `${url}+${formularioFiltros.color[i].value}&pr=${urlpr}`
                        } else {
                            window.location.href = `http://localhost:3030/productos/results?cl=${formularioFiltros.color[i].value}&pr=${urlpr}`
                        }
                    }
                }
            } else if (!filtroPrecio && filtroCategory.length != 0) {
                let url = location.href
                urlct = url.split('ct=')[1].split('&')[0]
                
                
                console.log(urlct);
                {

                    if (filtroColor.includes(formularioFiltros.color[i].value)) {
                        if (filtroColor.length == 1) {
                            window.location.href = `http://localhost:3030/productos/results?ct=${urlct}`
                        } else {
                            let filtrosNuevos = filtroColor.filter((filtro) => {
                                return filtro != formularioFiltros.color[i].value
                            })
                            filtrosNuevos = filtrosNuevos.join('+')
                            window.location.href = `http://localhost:3030/productos/results?ct=${urlct}&cl=${filtrosNuevos}`
                        }
                    } else {
                        if (query.has('cl')) {
                            url = url.split('&pr')[0]
                            window.location.href = `${url}+${formularioFiltros.color[i].value}`
                        } else {
                            window.location.href = `http://localhost:3030/productos/results?ct=${urlct}&cl=${formularioFiltros.color[i].value}`
                        }
                    }
                }

            } else {
                if (filtroColor.includes(formularioFiltros.color[i].value)) {
                    if (filtroColor.length == 1) {
                        window.location.href = `http://localhost:3030/productos`
                    } else {
                        let filtrosNuevos = filtroColor.filter((filtro) => {
                            return filtro != formularioFiltros.color[i].value
                        })
                        filtrosNuevos = filtrosNuevos.join('+')
                        window.location.href = `http://localhost:3030/productos/results?cl=${filtrosNuevos}`
                    }
                } else {
                    if (query.has('cl')) {
                        window.location.href = `${url}+${formularioFiltros.color[i].value}`
                    } else {
                        window.location.href = `http://localhost:3030/productos/results?cl=${formularioFiltros.color[i].value}`
                    }
                }
            }




        })

    }
    //filtros color - cerrar

}