// authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.token; // o desde la cabecera Authorization
    
    if (!token) {
        return res.status(401).send('Acceso no autorizado');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guardamos la información del usuario en req.user
        next();
    } catch (err) {
        return res.status(401).send('Acceso no autorizado');
    }
};
