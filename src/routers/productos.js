const express = require("express");
const  path  = require("path");
const router = express.Router();
const productosController = require(path.join(__dirname, '../controllers/productosController'));


router.get('/', productosController.productos);

module.exports = router;