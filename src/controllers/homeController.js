const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/dbProductos.json');
const productosJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller={
    home: (req, res) => {
    
        res.render(path.resolve(__dirname, '../views/home.ejs'), {productosJSON, toThousand})
    },
}
module.exports = controller;

