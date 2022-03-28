const express = require("express");
const  path  = require("path");
const router = express.Router();
const detalleController = require(path.join(__dirname, '../controllers/detalleController'));


router.get('/', detalleController.detalle);

module.exports = router;