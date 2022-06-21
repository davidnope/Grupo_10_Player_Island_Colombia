window.addEventListener('load', () => {
    let imgProfile = document.querySelector('.caja-img');
    let imgEditar = document.querySelector('.editar')

    imgProfile.addEventListener('mouseover', (e) => {
        imgEditar.classList.add('img_editar')
    })
    imgProfile.addEventListener('mouseout', (e) => {
        imgEditar.classList.remove('img_editar')
    })

})

