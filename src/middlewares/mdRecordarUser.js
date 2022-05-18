const path = require("path");
const fs = require("fs");

const usersFilePath = path.join(__dirname, '../data/user.json');
const usersFile = fs.readFileSync(usersFilePath, 'utf-8');
const usersJson = usersFile ? JSON.parse(usersFile) : [];

function mdRecordarUsuario (req, res, next){
    let userLogin;
    if(req.cookies.cookieRecordarUsuario != undefined && req.session.usuarioLogueado == undefined){
        for (let i = 0; i < usersJson.length; i++) {
            if (usersJson[i].email == req.cookies.cookieRecordarUsuario) {
                    userLogin = usersJson[i];
                    break;
            };
        };
    req.session.usuarioLogueado = userLogin;
    }; 
    next();
};

module.exports = mdRecordarUsuario;