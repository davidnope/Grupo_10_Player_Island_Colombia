window.onload = () => {
    let filtroCompany
    let filtroCategory = []
    let filtroPrecio 
    

    let query = new URLSearchParams(location.search);
    if (query.has('company')) {
        filtroCompany = query.get('company')
    }
    if (query.has('ct')) {
        filtroCategory = query.get('ct').split(' ')
    }

    if (query.has('pr')) {
        filtroPrecio = query.get('pr')
        console.log(filtroPrecio);
    }

    const play = document.querySelector('.play')
    const xbox = document.querySelector('.xbox ')
    const nintendo = document.querySelector('.nintendo ')
    const formularioFiltros = document.querySelector('#filtros')

    filtroCompany == 'playstation' ? play.classList.add('selected') : filtroCompany == 'xbox' ? xbox.classList.add('selected') : filtroCompany == 'nintendo' ? nintendo.classList.add('selected') : null;;;

    //filtros de categoria - cerrar

    for (let i = 0; i < formularioFiltros.categoria.length; i++) {


        if (filtroCategory.includes(formularioFiltros.categoria[i].value)) {
            formularioFiltros.categoria[i].setAttribute('checked', '')
        }
        console.log(location.href.split('pr='));
        console.log(filtroPrecio);
        /* console.log(formularioFiltros.categoria[i], `este es el numero ${i}`); */

        formularioFiltros.categoria[i].addEventListener('click', (e) => {
            let url = location.href
            
           
            if (filtroPrecio) {
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
            }else{
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
           if (filtroCategory.length>0) {
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
           }
        })

    }
    //filtros de precio

}