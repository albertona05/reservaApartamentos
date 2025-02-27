const Apartamento = require('../models/apartamento');

// Rutas existentes
exports.listar = async (req, res) => {
    const apartamentos = await Apartamento.findAll();
    res.render('apartamentos/listar', { apartamentos });
};

exports.detalle = async (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).send('ID inválido');

    const apartamento = await Apartamento.findOne({ where: { id } });
    if (apartamento) {
        res.render('apartamentos/detalle', { apartamento, csrfToken: req.csrfToken() });
    } else {
        res.status(404).send('Apartamento no encontrado');
    }
};

// Nueva función para mostrar el formulario de creación
exports.crearFormulario = (req, res) => {
    res.render('apartamentos/crear', { csrfToken: req.csrfToken() });
};

// Nueva función para guardar el nuevo apartamento
exports.crearApartamento = async (req, res) => {
    const { nombre, ubicacion, precio } = req.body;
    console.log(precio)

    if (!nombre || !ubicacion || !precio) {
        return res.status(400).send('Todos los campos son requeridos');
    }

    try {
        const nuevoApartamento = await Apartamento.create({
            nombre,
            ubicacion,
            precio
        });

        res.redirect('/apartamentos');  // Redirige a la lista de apartamentos
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el apartamento');
    }
};
