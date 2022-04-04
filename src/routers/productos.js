const express = require("express");
const  path  = require("path");
const router = express.Router();
const productosController = require(path.join(__dirname, '../controllers/productosController'));


router.get('/', productosController.productos);

router.get('/agregar', productosController.agregar);

router.get('/editar', productosController.editar);

router.get('/detalle-producto', productosController.detalle);

module.exports = router;