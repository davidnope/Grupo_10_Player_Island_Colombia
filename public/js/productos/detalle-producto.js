window.onload = ()=>{
    console.log('hola');

    let imagenesPequeñas = document.querySelectorAll('.imagenesPequeñas')
    let imagenPrincipal = document.querySelector('#imagenPrincipal')
    console.log(imagenPrincipal);

    for(let i = 0; i<imagenesPequeñas.length; i++){
        imagenesPequeñas[i].addEventListener('click',(e)=>{
            imagenPrincipal.style.backgroundImage =`url(${imagenesPequeñas[i].src})`
        })
    }

    for(let i = 0; i<imagenesPequeñas.length; i++){
        imagenesPequeñas[i].addEventListener('mouseover',(e)=>{
            imagenPrincipal.style.backgroundImage =`url(${imagenesPequeñas[i].src})`
        })
    }




}