window.addEventListener('load', () => {
    let imgProfile = document.querySelector('.img-profile')

    let ContainerImgProfile = document.querySelector('.caja-img');
    let imgEditar = document.querySelector('.img_editar');
    let información = document.querySelector('.informacion-completa');
    let imgCambio = document.querySelector('.img-cambio');
    let imgExistente = document.querySelector('.img-existente');
    let inputImg = document.querySelector('.inputImg');
    let botonAtras = document.querySelector('.boton-atras');
    let botonImg = document.querySelector('.boton-img');


    // id url
    let urlQuery = location.pathname.split('/')
    let query = urlQuery[3];
    // id url

    // cambiar icono
    
    // cambiar icono
    imgEditar.addEventListener('click', (e) => {
        información.style.display = 'none';
        imgCambio.style.display = 'flex';
    })

    botonAtras.addEventListener('click', (e)=>{
        location.reload()
        // información.style.display = 'flex';
        // imgCambio.style.display = 'none';
    })


    // // CAMBIO BOTON INPUT IMG
    botonImg.addEventListener('click', (e)=>{
        inputImg.click()
    })
    // CAMBIO BOTON INPUT IMG


        // AGREGAR IMG EXISTENTE
        fetch(`http://localhost:3030/api/user/uno/${query}`)
        .then(result =>{
            return result.json();
        }).then((obj)=>{
                imgExistente.style.backgroundImage = `url(/img/users/${obj.img_user})`
                imgExistente.style.boxShadow = '2px 2px 20px 1px rgba(0, 0, 0, 0.5)'
                imgProfile.style.backgroundImage = `url(/img/users/${obj.img_user})`
                imgProfile.style.boxShadow = '2px 2px 15px 1px rgba(0, 0, 0, 0.5)'
        })

    inputImg.addEventListener('change', (e)=>{
        let imgNueva = URL.createObjectURL(inputImg.files[0]);
        imgExistente.style.backgroundImage = `url(${imgNueva})`
    })


})



