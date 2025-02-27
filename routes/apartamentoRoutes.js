const express = require('express');
const router = express.Router();
const apartamentoController = require('../controllers/apartamentoController');

router.get('/', apartamentoController.listar);
router.get('/crear', apartamentoController.crearFormulario);
router.post('/crear', apartamentoController.crearApartamento);
router.get('/:id', apartamentoController.detalle);


module.exports = router;