window.onload = () => {

    let divImg = document.getElementById('divImg');
    let formImg = document.querySelector('.form-img');
    let botonAddImg = document.getElementById('botonAddImg')
    let inputImg = document.getElementById('img')
    let contImg = document.querySelector('.contenedorImg')
    let botonGuardar = document.querySelector('#botonGuardar')
    let imgEmergentes = document.querySelector('#emergente .contenedorEmergente .grupos')
    let emergente = document.querySelector('.emergente')
    let botonGuardarEmergente = document.querySelector('.guardarEmergente')
    
    botonAddImg.onclick = (e) => {
        e.preventDefault();
        inputImg.click();

        console.log('diste click');

    }
    botonGuardarEmergente.addEventListener('click', (e) => {
        emergente.classList.remove('show')
    })
    inputImg.addEventListener('change', (e) => {
        


        
        
        let imagenes = inputImg.files;
        for (let i = 0; i < imagenes.length; i++) {

            let imgCodified = URL.createObjectURL(imagenes[i])
            let img = `<div class="divPreImg" style='background-image: url(${imgCodified})'><div><i class="fa-regular fa-trash-can"></i></div></div>`
            /* formImg.innerHTML += img */
            contImg.innerHTML += img
            
            
        }
        emergente.classList.add('show')
        for (let i = 0; i < imagenes.length; i++) {
            console.log('entre al for');
            let imgCodified = URL.createObjectURL(imagenes[i])
            let name = imagenes[i].name.split(' ')[0].split('_')[0]
            if (name.length>14) {
                let letras = []
                for (let i = 0; i < 14; i++) {
                    letras.push(name[i])
                }
                name = letras.join('')
            }
            let img =  `
            <div class="bloque-edicion">
                <label for="imagenPrincipal${i}">${name}</label>
                <div class="form-imgPrincipal"
                style="background-image: url(${imgCodified});">
                <div style="display: flex; width: 100%;">
                    <input type="radio" name="imagenPrincipal" id="imagenPrincipal${i}"
                        value="img${i}">
                </div>
                 </div>
            </div>
            `
            
            imgEmergentes.innerHTML += img
            
        }
       


        let array = document.querySelectorAll('.divPreImg')
        let array2 = document.querySelectorAll('.divPreImg div')
        for (let i = 0; i < array.length; i++) {
            array[i].addEventListener('mouseover', (e) => {
                
                array2[i].style.display = 'flex'

            })
            array[i].addEventListener('mouseleave', (e) => {

                array2[i].style.display = 'none'

            })
            array[i].addEventListener('click', (e) => {

                array[i].remove()

            })

        }
    })



    /* let array = location.pathname.split('/')
    let id = array[3]
    let arrayimagenes = []

    fetch(`http://localhost:3030/api/productos/searchOne/${id}`)
        .then(result => result.json())
        .then(dato => {
            let ids = []
            let idsBorrados = []
            for (let i = 0; i < dato.imgProducts.length; i++) {
                
                if (!(dato.imgProducts[i].deleted)) {
                    ids.push(dato.imgProducts[i].id)
                }
            }
            console.log(ids);

            for (let i = 0; i < dato.imgProducts.length; i++) {
                if (!(dato.imgProducts[i].deleted)) {
                contImg.innerHTML += `<div id='imagen${dato.imgProducts[i].id}' class="divPreImg" style= 'background-image: url(/img/productos/${dato.imgProducts[i].name})' ><div><i class="fa-regular fa-trash-can"></i></div></div>`
                }



            }
            let array = document.querySelectorAll('.divPreImg')
            let array2 = document.querySelectorAll('.divPreImg div')
            for (let i = 0; i < array.length; i++) {
                array[i].addEventListener('mouseover', (e) => {

                    array2[i].style.display = 'flex'

                })
                array[i].addEventListener('mouseleave', (e) => {

                    array2[i].style.display = 'none'

                })
                array[i].addEventListener('click', (e) => {

                    array[i].remove()

                })

            }
            document.body.addEventListener('click', (e) => {

                for (let i = 0; i < ids.length; i++) {
                    if (document.querySelector(`#imagen${ids[i]}`)) {
                        console.log(` si existe la imagen ${ids[i]}`);
                    } else {
                        console.log(`no existe la imagen ${ids[i]}`);
                        
                        idsBorrados.push(ids[i])
                        console.log(idsBorrados);
                      

                        
                    }
                }

            })

            let data = {
                imgBorradas: idsBorrados
            }


            botonGuardar.addEventListener('click',(e)=>{
               
                fetch(`http://localhost:3030/api/productos/update/${id}`,{
                    method: 'POST',
                    body:  JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
    
            })


        }) */


        












    /* divEliminar. */













}



