window.onload = ()=>{
    console.log('hola');

    let imagenesPequeñas = document.querySelectorAll('.imagenesPequeñas')
    let imagenPrincipal = document.querySelector('.imgPrincipal')
    console.log(imagenPrincipal);

    for(let i = 0; i<imagenesPequeñas.length; i++){
        imagenesPequeñas[i].addEventListener('click',(e)=>{
            imagenPrincipal.src = imagenesPequeñas[i].src
        })
    }

    for(let i = 0; i<imagenesPequeñas.length; i++){
        imagenesPequeñas[i].addEventListener('mouseover',(e)=>{
            imagenPrincipal.src = imagenesPequeñas[i].src
        })
    }




}