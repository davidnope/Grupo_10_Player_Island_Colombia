const path = require("path");
const fs = require("fs");

const usersFilePath = path.join(__dirname, '../data/user.json');
const usersFile = fs.readFileSync(usersFilePath, 'utf-8');
const usersJson = usersFile ? JSON.parse(usersFile) : [];

const db = require('../database/models')
let usuarios = db.User

function mdRecordarUsuario (req, res, next){
    let userLogin;
    usuarios.findAll()
    .then(usuarios =>{
        if(req.cookies.cookieRecordarUsuario != undefined && req.session.usuarioLogueado == undefined){
            for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i].email == req.cookies.cookieRecordarUsuario) {
                        userLogin = usuarios[i];
                        break;
                };
            };
        req.session.usuarioLogueado = userLogin;
        }; 
    })
    next();
};

module.exports = mdRecordarUsuario;