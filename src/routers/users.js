const express = require("express");
const path = require("path");
const multer = require("multer");
const {body} = require('express-validator');

const usersController = require(path.join(__dirname, '../controllers/usersController'));

const router = express.Router();

// MIDDLEWARES
const validationRegister = require(path.join(__dirname,'../middlewares/mdValidUsers'));
const validationLogin = require(path.join(__dirname,'../middlewares/mdValidLogin'));

// form img
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/users'))
    },

    filename: (req, file, cb) => { 
        console.log(file);
        cb(null, `img_user_${req.body.usuario}_${req.body.apellido}_${Date.now()}_${path.extname(file.originalname)}`);
    },
});

const uploadFile = multer({storage : storage});

// Nuevo usuario
router.get('/register', usersController.registerView);
router.post('/registerSave', uploadFile.single('imgUser'), validationRegister, usersController.registerSave);

// login de un usuarios
router.get('/login', usersController.loginView);
router.post('/login', validationLogin, usersController.login);

// Lista de usuarios
router.get('/list', usersController.list)

// perfil views
router.get('/profile/:id', usersController.profile);

// Editar usuario
router.get('/edit/:id', uploadFile.single('imgUser'),usersController.editView);
router.put('/edit/:id',  uploadFile.single('imgUser'), usersController.editSave);

// Borrar usuario
router.get('/delete/:id', usersController.deleteView)
router.put('/delete/:id', usersController.deleteSave);
// JSON
// router.delete('/delete/:id', usersController.deleteSave);

// probar loginUser

router.get('/loginConfig', usersController.pruebaLogin)

module.exports = router;