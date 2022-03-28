const express = require("express");
const  path  = require("path");
const router = express.Router();
const registerController = require(path.join(__dirname, '../controllers/registerController'));


router.get('/', registerController.register);

module.exports = router;