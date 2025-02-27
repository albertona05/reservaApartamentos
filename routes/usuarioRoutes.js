const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { body } = require('express-validator');

router.get('/registro', usuarioController.mostrarRegistro);
router.post('/registro', 
    [
        body('nombre').notEmpty().escape(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 6 }).escape()
    ],
    usuarioController.registrar
);

router.get('/login', usuarioController.mostrarLogin);
router.post('/login', 
    [
        body('email').isEmail().normalizeEmail(),
        body('password').notEmpty().escape()
    ],
    usuarioController.login
);

router.get('/logout', usuarioController.logout);

module.exports = router;
