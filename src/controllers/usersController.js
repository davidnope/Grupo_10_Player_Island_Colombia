const path = require("path");
const fs = require("fs");
const usersFilePath = path.join(__dirname, '../data/user.json');
const usersFile = fs.readFileSync(usersFilePath, 'utf-8');
const usersJson = usersFile ? JSON.parse(usersFile) : [];


const controller = {
    loginView: (req, res) => {
        res.render(path.resolve(__dirname, '../views/login.ejs'))
    },

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
            direccion: req.body.dirrección,
            celular: req.body.celular,
            img: req.file.filename,
        }
        console.log(userNew.img);
        usersJson.push(userNew);
        createJson = JSON.stringify(usersJson, null, 2);
        fs.writeFileSync(usersFilePath, createJson);

        res.redirect('/')
    }

}
module.exports = controller;