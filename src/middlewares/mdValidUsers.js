const {body} = require('express-validator');
const path = require('path');

const validacionRegister = [
    body('usuario').notEmpty().withMessage('Escribe un usuario'),
    body('email').notEmpty().withMessage('Escribe un email').bail().isEmail().withMessage('Escribe un correo valido'),
    body('documento').notEmpty().withMessage('Escribe tu numero de documento').bail().isInt().withMessage('Debe ser un numero de identidad valido'),
    body('direccion').notEmpty().withMessage('Escribe tu dirección de recidencia'),
    body('celular').notEmpty().withMessage('Escribe un numero de contacto').bail().isInt().withMessage('Debe ser un numero valido'),

    body('contrasena').notEmpty().withMessage('Escribe una contraseña').bail()
    .custom((value, {req})=>{
        
        if(req.body && req.body.confirmarContrasen){
            throw new Error('Vuelve a llenar este campo');
        }

        if(!req.body.confirmarContrasena){
            throw new Error('llena el campo "Confirmar contraseña"');
        }
        
        if(req.body.confirmarContrasena != req.body.contrasena){
            throw new Error('Confirmar contraseña');
        }
        return true
    }),

    body('confirmarContrasena').notEmpty().withMessage('Confirmar contraseña').custom((value, {req})=>{

        if(req.body.confirmarContrasena != req.body.contrasena){
            throw new Error('No coincide las contraseñas');
        }
        return true;
    }),

    body('imgUser').custom((value, {req})=>{
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if(!file){
            throw new Error ('Agrega una imagen');
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error (`Las extensiones de archvio permitidos son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
]


module.exports = validacionRegister;