const  path  = require("path");



const controller={
    login: (req, res) => {
        res.render(path.resolve(__dirname, '../views/login.ejs'))
    },
}
module.exports = controller;