let inputNombre = document.querySelector('#nombre');
let inputApellido = document.querySelector('#apellido');
let inputDocumento = document.querySelector('#documento');
let inputEmail = document.querySelector('#email');
let inputDireccion = document.querySelector('#direccion');
let inputCelular = document.querySelector('#celular');
let inputContrasena = document.querySelector('#contrasena');
let inputConfirmarContrasena = document.querySelector('#confirmarContrasena');
let inputTipoUsuario = document.querySelector('#tipoDeUsuario');
let inputImg = document.querySelector('#imgUser');
let error = document.querySelectorAll('.errorJs');

let labels = document.querySelectorAll('.labels');
let inputs = document.querySelectorAll('.email-contrasena input');
let iconCheck = document.querySelectorAll('.icon-check');

let errores = 0;
let signosContrasena = [' ', '%', '$', '#', '@', '*', '/', '+', '-', '?'];
let signosDireccion = ['%', '$', '@', '*', '/', '+', '?', '='];

// funcion Texts
function validarInputsJs(input, indiceA) {
    switch (input.type) {
        case "text":
            input.addEventListener('keyup', (e) => {
                if (input.value.length >= 3) {
                    error[indiceA].classList.add('is-valid');
                    labels[indiceA].classList.remove('is-invalid');
                    labels[indiceA].classList.add('is-valid');
                    inputs[indiceA].style.borderBottom = '1px solid #198754';
                    iconCheck[indiceA].innerHTML = '  <i class="fa-solid fa-circle-check"></i>';
                    iconCheck[indiceA].style.color = 'green';
                    errores = 0
                } else {
                    labels[indiceA].classList.remove('is-valid');
                    labels[indiceA].classList.add('is-invalid');
                    inputs[indiceA].style.borderBottom = '1px solid red';
                    iconCheck[indiceA].innerHTML = '  <i class="fa-solid fa-circle-xmark"></i>';
                    iconCheck[indiceA].style.color = 'red';
                    errores = 1
                }
            });
            break;
        case "email":
            fetch('http://localhost:3030/api/user/list').then(result => result.json())
                .then(listUsers => {
                    let arrUser = [];

                    listUsers.data.forEach(users => {
                        arrUser.push(users)
                    });

                    input.addEventListener('keyup', (e) => {
                        let valid;
                        for (let i = 0; i < arrUser.length; i++) {
                            if (arrUser[i].email == input.value) {
                                valid = true;
                                break;
                            } else {
                                valid = false;
                            }
                        }

                        if (!valid) {
                            error[indiceA].classList.remove('is-invalid');
                            error[indiceA].classList.add('is-valid');
                            error[indiceA].innerHTML = '';
                            labels[indiceA].classList.remove('is-invalid');
                            labels[indiceA].classList.add('is-valid');
                            inputs[indiceA].style.borderBottom = '1px solid #198754';
                            iconCheck[indiceA].innerHTML = '  <i class="fa-solid fa-circle-check"></i>';
                            iconCheck[indiceA].style.color = 'green';
                            errores = 0;
                        } else {
                            error[indiceA].classList.add('is-invalid');
                            error[indiceA].innerHTML = 'Este correo ya existe';
                            labels[indiceA].classList.remove('is-valid');
                            labels[indiceA].classList.add('is-invalid');
                            inputs[indiceA].style.borderBottom = '1px solid red';
                            iconCheck[indiceA].innerHTML = '  <i class="fa-solid fa-circle-xmark"></i>';
                            iconCheck[indiceA].style.color = 'red';
                            errores = 1;
                        }
                    });
                })
            break;
        case "number":

            input.addEventListener('keyup', (e) => {
                if (input.value.length >= 6) {
                    error[indiceA].innerHTML = '';
                    error[indiceA].classList.add('is-valid');
                    labels[indiceA].classList.remove('is-invalid');
                    labels[indiceA].classList.add('is-valid');
                    inputs[indiceA].style.borderBottom = '1px solid #198754';
                    iconCheck[indiceA].innerHTML = '  <i class="fa-solid fa-circle-check"></i>';
                    iconCheck[indiceA].style.color = 'green';
                } else {
                    error[indiceA].classList.add('is-invalid');
                    error[indiceA].innerHTML = `Digite un numero de ${labels[indiceA].outerText.toLowerCase()} valido`;
                    labels[indiceA].classList.remove('is-valid');
                    labels[indiceA].classList.add('is-invalid');
                    inputs[indiceA].style.borderBottom = '1px solid red';
                    iconCheck[indiceA].innerHTML = '  <i class="fa-solid fa-circle-xmark"></i>';
                    iconCheck[indiceA].style.color = 'red';
                }
            });
            break;
        case "tel":

            input.addEventListener('keyup', (e) => {
                if (input.value.length >= 10) {
                    error[indiceA].innerHTML = '';
                    labels[indiceA].classList.remove('is-invalid');
                    labels[indiceA].classList.add('is-valid');
                    inputs[indiceA].style.borderBottom = '1px solid #198754';
                    iconCheck[indiceA].innerHTML = '  <i class="fa-solid fa-circle-check"></i>';
                    iconCheck[indiceA].style.color = 'green';
                } else {
                    error[indiceA].classList.add('is-invalid');
                    error[indiceA].innerHTML = `Digite un numero de ${labels[indiceA].outerText.toLowerCase()} valido`;
                    labels[indiceA].classList.remove('is-valid');
                    labels[indiceA].classList.add('is-invalid');
                    inputs[indiceA].style.borderBottom = '1px solid red';
                    iconCheck[indiceA].innerHTML = '  <i class="fa-solid fa-circle-xmark"></i>';
                    iconCheck[indiceA].style.color = 'red';
                }
            });
        break;
        case "password":
            input.addEventListener('focus', (e) => {
                if (input.value == '') {
                    error[indiceA].innerHTML = 'Minimo 8 caracteres';
                    error[indiceA].classList.add('is-invalid');
                    errores = 1
                }
                input.addEventListener('keyup', (e) => {
                    if (input.value.length >= 8) {
                        error[indiceA].innerHTML = '';
                        error[indiceA].classList.add('is-valid');
                        labels[indiceA].classList.remove('is-invalid');
                        labels[indiceA].classList.add('is-valid');
                        inputs[indiceA].style.borderBottom = '1px solid #198754';
                        iconCheck[indiceA].innerHTML = '  <i class="fa-solid fa-circle-check"></i>';
                        iconCheck[indiceA].style.color = 'green';
                        for (let i = 0; i < signosContrasena.length; i++) {
                            if (input.value.includes(signosContrasena[i])) {
                                error[indiceA].innerHTML = 'No se aceptan estos caracteres "%, $, #, @, *, /, +, -, ?"';
                                error[indiceA].classList.add('is-invalid');
                                labels[indiceA].classList.remove('is-valid');
                                labels[indiceA].classList.add('is-invalid');
                                inputs[indiceA].style.borderBottom = '1px solid red';
                                iconCheck[indiceA].innerHTML = '  <i class="fa-solid fa-circle-xmark"></i>';
                                iconCheck[indiceA].style.color = 'red';
                                errores = 1
                            }
                        }
                        errores = 0;
                    } else {
                        error[indiceA].innerHTML = 'Minimo 8 caracteres';
                        error[indiceA].classList.add('is-invalid');
                        labels[indiceA].classList.remove('is-valid');
                        labels[indiceA].classList.add('is-invalid');
                        inputs[indiceA].style.borderBottom = '1px solid red';
                        iconCheck[indiceA].innerHTML = '  <i class="fa-solid fa-circle-xmark"></i>';
                        iconCheck[indiceA].style.color = 'red';
                        for (let i = 0; i < signosContrasena.length; i++) {
                            if (input.value.includes(signosContrasena[i])) {
                                error[indiceA].innerHTML = 'No se aceptan estos caracteres "%, $, #, @, *, /, +, -, ?"';
                                error[indiceA].classList.add('is-invalid');
                                errores = 1
                            }
                        }
                        errores = 1
                    }
                })
            })
            break;
        }

}

// NOMBRE Y APELLIDO
validarInputsJs(inputNombre, 0);
validarInputsJs(inputApellido, 1);
validarInputsJs(inputDocumento, 2);
validarInputsJs(inputEmail, 3);
validarInputsJs(inputDireccion, 4);
validarInputsJs(inputCelular, 5);
validarInputsJs(inputContrasena, 6);
validarInputsJs(inputConfirmarContrasena, 7);


// CONTRASEÑA

// CONTRASEÑA