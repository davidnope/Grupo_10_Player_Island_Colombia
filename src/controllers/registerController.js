const  path  = require("path");



const controller={
    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/register.ejs'))
    },
}
module.exports = controller;