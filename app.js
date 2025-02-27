const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const session = require('express-session');
const usuarioRoutes = require('./routes/usuarioRoutes');
const apartamentoRoutes = require('./routes/apartamentoRoutes');
const reservaRoutes = require('./routes/reservaRoutes');

const app = express();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true }
}));

app.use('/usuarios', usuarioRoutes);
app.use('/apartamentos', apartamentoRoutes);
app.use('/reservas', reservaRoutes);

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
});

app.listen(3000, () => console.log('Servidor iniciado en https://localhost:3000'));
