const path = require("path");
const fs = require("fs");
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/user.json');
const usersFile = fs.readFileSync(usersFilePath, 'utf-8');
const usersJson = usersFile ? JSON.parse(usersFile) : [];
const formValidator = (req, res) => {
    let result = {
        valid: true
    };

    let errorsValidation = validationResult(req);

        if (errorsValidation.errors.length > 0) {
            result.valid = false;
            res.render(path.join(__dirname, '../views/register.ejs'), {
                errores: errorsValidation.mapped(), old: req.body
            });
        } 
    return result;
}; 

const controller = {
    loginView: (req, res) => {
        res.render(path.resolve(__dirname, '../views/login.ejs'))
    },


    // Nuevo usuario
    registerView: (req, res) => {
        res.render(path.join(__dirname, '../views/register.ejs'))
    },

    registerSave: (req, res) => {

        // VALIDACIONES
        let form = formValidator(req, res);

        if(form.valid){

            // Agregar usuario
            let idNumero = usersJson.length ? usersJson[usersJson.length - 1].id : 0;


            let userNew = {
                id: ++idNumero,
                usuario: req.body.usuario,
                email: req.body.email,
                contrasena: req.body.contrasena,
                numeroDocumento: req.body.documento,
                direccion: req.body.direccion,
                celular: req.body.celular,
                tipoDeUsuario: req.body.tipoDeUsuario,
                img: !req.file ? 'default.png' : req.file.filename,
            }
            usersJson.push(userNew);
            createJson = JSON.stringify(usersJson, null, 2);
            fs.writeFileSync(usersFilePath, createJson);
            res.redirect('/')
        }

    },

    list: (req, res) => {
        console.log(usersJson);
        res.render(path.join(__dirname, '../views/list-users.ejs'), { users: usersJson })
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

        res.redirect('/')
    },


    // Borrar usuario
    deleteView: (req, res) => {

        let userSelect = usersJson.find(usuario => usuario.id == req.params.id);
        console.log(userSelect);

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