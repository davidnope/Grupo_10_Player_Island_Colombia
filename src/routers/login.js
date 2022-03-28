const express = require("express");
const  path  = require("path");
const router = express.Router();
const loginController = require(path.join(__dirname, '../controllers/loginController'));


router.get('/', loginController.login);

module.exports = router;