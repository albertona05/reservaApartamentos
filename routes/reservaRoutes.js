const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const authMiddleware = require('../controllers/authMiddleware');


router.post('/crear/:id',authMiddleware, reservaController.crear);
router.get('/', authMiddleware, reservaController.listarPorUsuario);
router.get('/:id', authMiddleware, reservaController.detalle);
router.post('/editar/:id', authMiddleware, reservaController.editar);
router.post('/eliminar/:id', authMiddleware, reservaController.eliminar);


module.exports = router;
