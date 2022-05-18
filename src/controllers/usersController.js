const path = require("path");
const fs = require("fs");
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/user.json');
const usersFile = fs.readFileSync(usersFilePath, 'utf-8');
const usersJson = usersFile ? JSON.parse(usersFile) : [];


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

        if (validacion.valid) {
            for (let i = 0; i < usersJson.length; i++) {
                if (req.body.email == usersJson[i].email) {
                    if (bcrypt.compareSync(req.body.contrasena, usersJson[i].contrasena)) {
                        userLogin = usersJson[i];
                        break;
                    }
                };
            };

            if (userLogin == undefined) {
                return res.render(rutaRedirect, { errores: { contrasena: { msg: 'No se encontro usuario' } } });
            }

            req.session.usuarioLogueado = userLogin;

            if(req.body.recordarUsuario != undefined){
                res.cookie('cookieRecordarUsuario', userLogin.email, {maxAge: 86400000});
            };

            res.redirect('/');
        };
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

            // Agregar usuario
            let idNumero = usersJson.length ? usersJson[usersJson.length - 1].id : 0;


            let userNew = {
                id: ++idNumero,
                usuario: req.body.usuario,
                email: req.body.email,
                contrasena: bcrypt.hashSync(req.body.contrasena, 10),
                numeroDocumento: req.body.documento,
                direccion: req.body.direccion,
                celular: req.body.celular,
                tipoDeUsuario: req.body.tipoDeUsuario,
                img: !req.file ? 'default.png' : req.file.filename,
            }
            usersJson.push(userNew);
            createJson = JSON.stringify(usersJson, null, 2);
            fs.writeFileSync(usersFilePath, createJson);
            res.redirect('/user/list')
        }

    },
    // lista de usuarios
    list: (req, res) => {
        res.render(path.join(__dirname, '../views/list-users.ejs'), { users: usersJson })
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

        let userSelect = usersJson.find(usuario => usuario.id == req.params.id);

        res.render(path.join(__dirname, '../views/profile.ejs'), {opcion : opcionesView, userSelect})
    },
    // Editar usuario
    editView: (req, res) => {

        let userSelect = usersJson.find(usuario => usuario.id == req.params.id);

        res.render(path.join(__dirname, '../views/edit-user.ejs'), { userSelect })
    },

    editSave: (req, res) => {

        let posicionUser = usersJson.findIndex(user => user.id == req.params.id);
        if (posicionUser >= 0) {
            usersJson[posicionUser].usuario = req.body.usuario;
            usersJson[posicionUser].email = req.body.email;
            usersJson[posicionUser].contrasena = req.body.contrasena;
            usersJson[posicionUser].numeroDocumento = req.body.documento;
            usersJson[posicionUser].direccion = req.body.direccion;
            usersJson[posicionUser].tipoDeUsuario = req.body.tipoDeUsuario;
            usersJson[posicionUser].celular = req.body.celular;
        }

        let updateJson = JSON.stringify(usersJson, null, 2);
        fs.writeFileSync(usersFilePath, updateJson);

        res.redirect('/user/list')
    },
    // Borrar usuario
    deleteView: (req, res) => {

        let userSelect = usersJson.find(usuario => usuario.id == req.params.id);

        res.render(path.join(__dirname, '../views/delete-user.ejs'), { userSelect })
    },

    deleteSave: (req, res) => {

        let arrayFinal = usersJson.filter(user => user.id != req.params.id);

        let updateJson = JSON.stringify(arrayFinal, null, 2);
        fs.writeFileSync(usersFilePath, updateJson);

        res.redirect('/')
    }
}
module.exports = controller;