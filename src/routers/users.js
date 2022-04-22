const express = require("express");
const path = require("path");
const multer = require("multer");
const {body} = require('express-validator');

const usersController = require(path.join(__dirname, '../controllers/usersController'));

const router = express.Router();

// MIDDLEWARES
const validacionRegister = require(path.join(__dirname,'../middlewares/mdValidUsers'));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/users'))
    },

    filename: (req, file, cb) => { 
        console.log(file);
        cb(null, `img_user_${req.body.usuario}_${Date.now()}_${path.extname(file.originalname)}`);
    
    },
});



const uploadFile = multer({storage : storage});

router.get('/login', usersController.loginView);

// Nuevo usuario
router.get('/register', usersController.registerView);
router.post('/registerSave', uploadFile.single('imgUser'), validacionRegister, usersController.registerSave);

// Editar usuario
router.get('/edit/:id', uploadFile.single('imgUser'),usersController.editView);
router.put('/edit/:id',  uploadFile.single('imgUser'), usersController.editSave);

// Borrar usuario
router.get('/delete/:id', usersController.deleteView)
router.delete('/delete/:id', usersController.deleteSave);

module.exports = router;