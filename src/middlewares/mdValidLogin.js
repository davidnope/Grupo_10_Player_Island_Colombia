const {body} = require('express-validator');


const validacionLogin = [
    // validacion login
    body('email').notEmpty().withMessage('Escribe un email').bail().isEmail().withMessage('Escribe un correo valido'),
    body('contrasena').notEmpty().withMessage('Escribe una contraseña'),
]

module.exports = validacionLogin;