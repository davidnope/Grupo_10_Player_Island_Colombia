const path = require("path");
const fs = require("fs");
const usersFilePath = path.join(__dirname, '../data/user.json');
const usersFile = fs.readFileSync(usersFilePath, 'utf-8');
const usersJson = usersFile ? JSON.parse(usersFile) : [];


const controller = {
    loginView: (req, res) => {
        res.render(path.resolve(__dirname, '../views/login.ejs'))
    },


    // Nuevo usuario
    registerView: (req, res) => {
        res.render(path.join(__dirname, '../views/register.ejs'))
    },

    registerSave: (req, res) => {
        let idNumero = usersJson.length ? usersJson[usersJson.length - 1].id : 0;

        let userNew = {
            id: ++idNumero,
            usuario: req.body.usuario,
            email: req.body.email,
            contrasena: req.body.contrasena,
            numeroDocumento: req.body.documento,
            direccion: req.body.direccion,
            celular: req.body.celular,
            img: req.file.filename,
        }
        usersJson.push(userNew);
        createJson = JSON.stringify(usersJson, null, 2);
        fs.writeFileSync(usersFilePath, createJson);
        res.redirect('/')
    },


    // Editar usuario
    editView: (req, res) => {

        let userSelect = usersJson.find(usuario => usuario.id == req.params.id);

        res.render(path.join(__dirname, '../views/edit-user.ejs'), {userSelect})
    },

    editSave: (req, res) => {

        let posicionUser = usersJson.findIndex(user => user.id == req.params.id);
        if(posicionUser >= 0){
            usersJson[posicionUser].usuario = req.body.usuario;
            usersJson[posicionUser].email = req.body.email;
            usersJson[posicionUser].contrasena = req.body.contrasena;
            usersJson[posicionUser].numeroDocumento = req.body.documento;
            usersJson[posicionUser].direccion = req.body.direccion;
            usersJson[posicionUser].celular = req.body.celular;
        }
        
        let updateJson = JSON.stringify(usersJson, null, 2);
        fs.writeFileSync(usersFilePath, updateJson);

        res.redirect('/')
    },

    
    // Borrar usuario
    deleteView: (req, res) => {

        let userSelect = usersJson.find(usuario => usuario.id == req.params.id);

        res.render(path.join(__dirname, '../views/delete-user.ejs'), {userSelect})
    },

    deleteSave: (req, res) =>{

        let arrayFinal = usersJson.filter(user => user.id != req.params.id);

        let updateJson = JSON.stringify(arrayFinal, null, 2);
        console.log(updateJson);
        fs.writeFileSync(usersFilePath, updateJson);

        res.send('se borro')
    }
}
module.exports = controller;