    const inputName = document.querySelector('#name')
    const inputPrice = document.querySelector('#price')
    const inputDiscount = document.querySelector('#discount')
    const inputCategory = document.querySelector('#category')
    const inputStock = document.querySelector('#stock')
    const inputCompany = document.querySelector('#company')
    const divColores = document.querySelector('#divColores')
    const contenedorColores = document.querySelector('#contenedorColores')
    const contenedorColoresDiv = document.querySelectorAll('#contenedorColores div')
    const btnColor = document.querySelector('#btnColor')
    const inputImg = document.getElementById('img')
    const inputFeatures = document.querySelector('#features')
    const inputDescription = document.querySelector('#description')
    const imgPrincipalRadio = document.querySelectorAll('.radio')
    const obligatorios = document.querySelectorAll('.obligatorio')
    const btnSubmit = document.querySelector('.submit')
    const form = document.querySelector('#form')
    const msjErrores = document.querySelector('.mensajeDeErrores')



    console.log(obligatorios);

    

    for (let i = 0; i < obligatorios.length; i++) {
        obligatorios[i].addEventListener('blur', (e)=>{
            console.log(e.target.value);
           
            if (e.target.value === '') {
                e.target.classList.add('incompleto')
                preventXError = 1
            } else {
                e.target.classList.remove('incompleto')
                preventXError = 0
            }
        })
        
    }
    
    let preventXError = 0 
    
    inputName.addEventListener('focus',(e)=>{
        let papa = inputName.parentNode
        let error 
        inputName.addEventListener('keyup',(e)=>{
            
            if (inputName.value.length < 5) {
                inputName.classList.remove('valido')
                inputName.classList.add('advertencia')
                
                papa.lastElementChild.style.color = 'orange'
                papa.lastElementChild.innerText = `*Minimo 5 caracteres`
                error = 1
            }else{
                inputName.classList.add('valido')
                papa.lastElementChild.innerText = ``
                error = 0
                preventXError = 0
            }
        })
        inputName.addEventListener('blur',(e)=>{
        
            inputName.classList.remove('advertencia')
            if (error) {
                inputName.classList.remove('valido')
                inputName.classList.add('incompleto')
                preventXError = 1
            }
    
        })
    })

    inputPrice.addEventListener('focus',(e)=>{
        let papa = inputPrice.parentNode
        let error 
        inputPrice.addEventListener('keyup',(e)=>{
            
            if (inputPrice.value < 50) {
                inputPrice.classList.remove('valido')
                inputPrice.classList.add('advertencia')
                console.log('probando',inputPrice.value)
                papa.lastElementChild.style.color = 'orange'
                papa.lastElementChild.innerText = `minimo $50 pesos`
                error = 1
            }else{
                inputPrice.classList.add('valido')
                papa.lastElementChild.innerText = ``
                error = 0
                preventXError = 0
            }
        })
        inputPrice.addEventListener('blur',(e)=>{
        
            inputPrice.classList.remove('advertencia')
            if (error) {
                inputPrice.classList.remove('valido')
                inputPrice.classList.add('incompleto')
                preventXError = 1
            }
    
        })
    })
    
    inputDiscount.addEventListener('focus',(e)=>{
        let papa = inputDiscount.parentNode
        let error 
        inputDiscount.addEventListener('keyup',(e)=>{
            
            if (inputDiscount.value < 0 || inputDiscount.value >= 100 ) {
                inputDiscount.classList.remove('valido')
                inputDiscount.classList.add('advertencia')
                papa.lastElementChild.style.color = 'orange'
                papa.lastElementChild.innerText = `valores entre 1 - 100`
                error = 1
            }else{
                inputDiscount.classList.add('valido')
                papa.lastElementChild.innerText = ``
                error = 0
                preventXError = 0
            }
        })
        inputDiscount.addEventListener('blur',(e)=>{
        
            inputDiscount.classList.remove('advertencia')
            if (error) {
                inputDiscount.classList.remove('valido')
                inputDiscount.classList.add('incompleto')
                preventXError = 1
            }
    
        })
    })

    inputStock.addEventListener('focus',(e)=>{
        let papa = inputStock.parentNode
        let error 
        inputStock.addEventListener('keyup',(e)=>{
            
            if (inputStock.value <= 0 || !(inputStock.value % 1 === 0)) {
                inputStock.classList.remove('valido')
                inputStock.classList.add('advertencia')
                papa.lastElementChild.style.color = 'orange'
                papa.lastElementChild.innerText = `no puede digitar '0', numeros negativos o decimales` 
                error = 1
                
            }else{
                inputStock.classList.add('valido')
                papa.lastElementChild.innerText = ``
                error = 0
                preventXError = 0
            }
        })
        inputStock.addEventListener('blur',(e)=>{
        
            inputStock.classList.remove('advertencia')
            if (error) {
                inputStock.classList.remove('valido')
                inputStock.classList.add('incompleto')
                preventXError = 1
            }
    
        })
    })

    inputDescription.addEventListener('focus',(e)=>{
        let papa = inputDescription.parentNode
        console.log('focus en description')
        let error 
        inputDescription.addEventListener('keyup',(e)=>{
            
            if (inputDescription.value.length < 20) {
                inputDescription.classList.remove('valido')
                inputDescription.classList.add('advertencia')
                papa.lastElementChild.style.color = 'orange'
                papa.lastElementChild.innerText = `minimo 20 caracteres` 
                error = 1
            }else{
                inputDescription.classList.add('valido')
                papa.lastElementChild.innerText = ``
                error = 0
                preventXError = 0
            }
        })
        inputDescription.addEventListener('blur',(e)=>{
        
            inputDescription.classList.remove('advertencia')
            if (error) {
                inputDescription.classList.remove('valido')
                inputDescription.classList.add('incompleto')
                preventXError = 1
            }
    
        })
    })

    inputFeatures.addEventListener('focus',(e)=>{
        let papa = inputFeatures.parentNode
        let error 
        inputFeatures.addEventListener('keyup',(e)=>{
            
            if (inputFeatures.value.length < 20 && inputFeatures.value.length != 0) {
                inputFeatures.classList.remove('valido')
                inputFeatures.classList.add('advertencia')
                papa.lastElementChild.style.color = 'orange'
                papa.lastElementChild.innerText = `minimo 20 caracteres` 
                error = 1
            }else{
                inputFeatures.classList.add('valido')
                papa.lastElementChild.innerText = ``
                error = 0
                preventXError = 0
            }
        })
        inputFeatures.addEventListener('blur',(e)=>{
        
            inputFeatures.classList.remove('advertencia')
            if (error) {
                inputFeatures.classList.remove('valido')
                inputFeatures.classList.add('incompleto')
                preventXError = 1
            }
    
        })
    })

    window.addEventListener('keyup', (e)=>{
        
        if (e.key === 'Enter') {
            form.addEventListener('submit',(e)=>{
            
                e.preventDefault()
                console.log('lo detuve por submit');
                
            })
        }
    })

    form.addEventListener('submit',(e)=>{
        if (preventXError) {
            e.preventDefault()
            msjErrores.classList.add('show') 
        }    
        
        
    })

    btnSubmit.addEventListener('click',(e)=>{
        if (preventXError) {
            e.preventDefault()
            msjErrores.classList.add('show') 
        } 
       
    })

    for (let i = 0; i < contenedorColoresDiv.length; i++) {
        
        
        if(contenedorColoresDiv[i].childNodes[1].getAttribute('checked')== ''){
            contenedorColoresDiv[i].classList.toggle('opcolorSelected')
        }
        
    }
    

    btnColor.addEventListener('click', (e)=>{
        
        contenedorColores.classList.toggle('colores')
        contenedorColores.classList.toggle('coloresShow')

        for (let i = 0; i < contenedorColoresDiv.length; i++) {
            contenedorColoresDiv[i].addEventListener('click',(e)=>{
                e.target.classList.toggle('opcolorSelected')
                
                
                if(e.target.childNodes[1].getAttribute('checked')==''){
                    e.target.childNodes[1].removeAttribute('checked') 
                }else{
                    e.target.childNodes[1].setAttribute('checked', '')
                }
            })
            
        }
    })


    
    
