window.onload = () => {
    console.log('enlazados') 
    let usuario 
    let query = new URLSearchParams(location.search)
    if (query.has('u')) {
        usuario = query.get('u')
    }
    let btnCompra = document.querySelector('#btnCompra')
    let btnEliminar = document.querySelectorAll('.botones-articulo button.delete')
    console.log(btnEliminar);
    
    for (let i = 0; i < btnEliminar.length; i++) {
        btnEliminar[i].addEventListener('click',(e)=>{

            fetch(`http://localhost:3030/api/carrito-compras/eliminar?u=${usuario}&p=${i}`)
            .then(result => result.json())
            .then(data=>{
                console.log(data)
                location.reload()
            })
            
        })        
    }




}

    
