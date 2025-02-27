const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.mostrarRegistro = (req, res) => {
    res.render('usuarios/registro', { csrfToken: req.csrfToken() });
};

exports.registrar = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send('Datos inválidos');
    }
    
    const { nombre, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await Usuario.create({ nombre, email, password: hash });
    res.redirect('/usuarios/login');
};

exports.mostrarLogin = (req, res) => {
    res.render('usuarios/login', { csrfToken: req.csrfToken() });
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send('Datos inválidos');
    }

    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (usuario && await bcrypt.compare(password, usuario.password)) {
        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.redirect('/apartamentos/');
    } else {
        res.send('Credenciales incorrectas');
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};
