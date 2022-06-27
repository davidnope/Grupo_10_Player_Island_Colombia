window.onload = () => {
    let contenedorSearch = document.querySelector('#barraBusqueda')
    let buscador = document.querySelector('#search');
    let predicciones = document.querySelector('.predicciones');
    


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
                
                    predicciones.innerHTML = ''
                    for (let i = 0; i < 5; i++) {
                        if (listadoProducts[i]) {
                            if (listadoProducts[i].toUpperCase().includes(buscador.value.toUpperCase())) {
                                // console.log(listadoProducts[i])
                                predicciones.innerHTML += `<p>${listadoProducts[i]}</p>`
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
    
                    
                    if (e.key == 'ArrowDown' && contador <arrayP.length-1) {
                        contador++
                    }
                    if (e.key == 'ArrowUp' && contador >=0) {
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
                        }
                        arrayP[i].addEventListener('click', () => {
                            console.log('click');
                            buscador.value = arrayP[i].outerText
                        })
                    }
                })
            })

            buscador.addEventListener('blur', ()=>{
                predicciones.style.display = 'none';
                contenedorSearch.style.borderRadius = '20px 20px 20px 20px';
            })
            


        }
        )




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


}
