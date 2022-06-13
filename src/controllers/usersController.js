const path = require("path");
const fs = require("fs");
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


// JSON

const usersFilePath = path.join(__dirname, '../data/user.json');
const usersFile = fs.readFileSync(usersFilePath, 'utf-8');
const usersJson = usersFile ? JSON.parse(usersFile) : [];

// base de datos - MODELOS
const db = require('../database/models')
let usuarios = db.User

let rutaRedirect;
const formValidator = (req, res) => {
    let result = {
        valid: true
    };

    let errorsValidation = validationResult(req);

    if (errorsValidation.errors.length > 0) {
        result.valid = false;
        res.render(rutaRedirect, {
            errores: errorsValidation.mapped(), old: req.body
        });
    }
    return result;
};



const controller = {
    // login usuario
    loginView: (req, res) => {
        res.render(path.resolve(__dirname, '../views/login.ejs'))
    },
    login: (req, res) => {

        rutaRedirect = path.join(__dirname, '../views/login.ejs');

        let validacion = formValidator(req, res);

        let userLogin;
        usuarios.findAll()
        .then(usuarios =>{
            if (validacion.valid) {
                for (let i = 0; i < usuarios.length; i++) {
                    if (req.body.email == usuarios[i].email) {
                        if (bcrypt.compareSync(req.body.contrasena, usuarios[i].password)) {
                            userLogin = usuarios[i];
                            break;
                        }
                    };
                };
    
                if (userLogin == undefined) {
                    return res.render(rutaRedirect, { errores: { contrasena: { msg: 'Credenciales invalidas' } } });
                }
    
                req.session.usuarioLogueado = userLogin;
    
                if(req.body.recordarUsuario != undefined){
                    res.cookie('cookieRecordarUsuario', userLogin.email, {maxAge: 86400000});
                };
                console.log('req.cookies.cookieRecordarUsuario');
                res.redirect('/');
            };   
        })
    },
    pruebaLogin: (req, res) => {
        let userLoggedInSess = req.session.usuarioLogueado;
        let userLoggedInCok = req.cookies.cookieRecordarUsuario;
        res.render(path.join(__dirname, '../views/prueba.ejs'), {userLoggedInCok, userLoggedInSess})
    },
    // Nuevo usuario
    registerView: (req, res) => {
        res.render(path.join(__dirname, '../views/register.ejs'))
    },
    registerSave: (req, res) => {

        // VALIDACIONES
        rutaRedirect = path.join(__dirname, '../views/register.ejs');
        let form = formValidator(req, res);
        if (form.valid) {
        usuarios.create({
            first_name: req.body.nombre,
            last_name: req.body.apellido,
            type_user: req.body.tipoDeUsuario,
            email: req.body.email,
            user_dni: req.body.documento,
            phone_number: req.body.celular,
            adress: req.body.direccion,
            password: bcrypt.hashSync(req.body.contrasena, 10),
            img_user: !req.file ? 'default.png' : req.file.filename,
            delete: 0,
        })
            res.redirect('/user/list')
    }   
        // JSON
        // if (form.valid) {

        //     // Agregar usuario
        //     let idNumero = usersJson.length ? usersJson[usersJson.length - 1].id : 0;


        //     let userNew = {
        //         id: ++idNumero,
        //         usuario: req.body.usuario,
        //         email: req.body.email,
        //         contrasena: bcrypt.hashSync(req.body.contrasena, 10),
        //         numeroDocumento: req.body.documento,
        //         direccion: req.body.direccion,
        //         celular: req.body.celular,
        //         tipoDeUsuario: req.body.tipoDeUsuario,
        //         img: !req.file ? 'default.png' : req.file.filename,
        //     }
        //     usersJson.push(userNew);
        //     createJson = JSON.stringify(usersJson, null, 2);
        //     fs.writeFileSync(usersFilePath, createJson);
        //     res.redirect('/user/list')
        // }
    },
    // lista de usuarios
    list: (req, res) => {
        usuarios.findAll({
            where:{
                deleted: 0 && null
            }
        })
        .then(usuarios =>{
            res.render(path.join(__dirname, '../views/list-users.ejs'), { users: usuarios })
        })
        // JSON res.render(path.join(__dirname, '../views/list-users.ejs'), { users: usersJson })
    },
    // perfil de usuario
    profile: (req, res) => {
        let opcionesView = [
            {
                opcion: 'Mis datos',
                info: 'Edita tus datos personales',
                ruta: "/user/edit/",
                img: "default.png"
            },
            {
                opcion: 'Seguridad',
                info: 'Cambiar contraseña',
                ruta: "/",
                img: "seguridad.png"
            },
            {
                opcion: 'Compras',
                info: 'Revisa el historial de tus Compras',
                ruta: "/",
                img: "compras.png"
            },
            {
                opcion: 'Ventas',
                info: 'Revisa el historial de tus Ventas',
                ruta: "/",
                img: "ventas.png"
            },
        ];

        usuarios.findByPk(req.params.id)
        .then(user =>{
            res.render(path.join(__dirname, '../views/profile.ejs'), {opcion : opcionesView, userSelect: user})
        })
        //JSON let userSelect = usersJson.find(usuario => usuario.id == req.params.id);

        //JSON res.render(path.join(__dirname, '../views/profile.ejs'), {opcion : opcionesView, userSelect})
    },
    // Editar usuario
    editView: (req, res) => {
        usuarios.findByPk(req.params.id)
        .then(usuario => {
            res.render(path.join(__dirname, '../views/edit-user.ejs'), { userSelect : usuario })
        })
        // JSON
        // let userSelect = usersJson.find(usuario => usuario.id == req.params.id);
        // res.render(path.join(__dirname, '../views/edit-user.ejs'), { userSelect })
    },
    editSave: (req, res) => {
        usuarios.update({
            first_name: req.body.nombre,
            last_name: req.body.apellido,
            type_user: req.body.tipoDeUsuario,
            email: req.body.email,
            user_dni: req.body.documento,
            phone_number: req.body.celular,
            adress: req.body.direccion,
        },{
            where: {
                id: req.params.id,
            }
        })
        // JSON
        // let posicionUser = usersJson.findIndex(user => user.id == req.params.id);
        // if (posicionUser >= 0) {
        //     usersJson[posicionUser].usuario = req.body.nombre;
        //     usersJson[posicionUser].email = req.body.email;
        //     usersJson[posicionUser].contrasena = req.body.contrasena;
        //     usersJson[posicionUser].numeroDocumento = req.body.documento;
        //     usersJson[posicionUser].direccion = req.body.direccion;
        //     usersJson[posicionUser].tipoDeUsuario = req.body.tipoDeUsuario;
        //     usersJson[posicionUser].celular = req.body.celular;
        // }

        // let updateJson = JSON.stringify(usersJson, null, 2);
        // fs.writeFileSync(usersFilePath, updateJson);

         res.redirect('/user/profile/' + req.params.id)
    },
    // Borrar usuario
    deleteView: (req, res) => {
        usuarios.findByPk(req.params.id)
        .then(usuario => {
            res.render(path.join(__dirname, '../views/delete-user.ejs'), { userSelect: usuario })
        })
        // JSON
        // let userSelect = usersJson.find(usuario => usuario.id == req.params.id);

        // res.render(path.join(__dirname, '../views/delete-user.ejs'), { userSelect })
    },
    deleteSave: (req, res) => {

        usuarios.update({
            deleted: 1
        },{
            where:{
                id: req.params.id
            }
        })
        // JSON
        // let arrayFinal = usersJson.filter(user => user.id != req.params.id);

        // let updateJson = JSON.stringify(arrayFinal, null, 2);
        // fs.writeFileSync(usersFilePath, updateJson);

        res.redirect('/user/list')
    },
}
module.exports = controller;