const Apartamento = require('../models/apartamento');
const Reserva = require('../models/reserva');
const { validationResult } = require('express-validator');

// Crear una reserva
exports.crear = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send('Datos inválidos');
    }

    // Obtenemos el usuarioId del token (asegurándonos de que esté autenticado)
    const usuarioId = req.user.id;
    
    // Obtenemos el apartamentoId de los parámetros de la URL
    const apartamentoId = req.params.id;
    console.log(apartamentoId)
    
    // Obtenemos las fechas desde el cuerpo de la solicitud
    const { fechaInicio, fechaFin } = req.body;
    
    // Creamos la reserva
    try {
        await Reserva.create({
            usuarioId,
            apartamentoId,
            fechaInicio,
            fechaFin
        });
        
        // Redirigimos al usuario a la página de reservas
        res.redirect('/reservas');
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        res.status(500).send('Error al crear la reserva');
    }
};

// Listar reservas del usuario actual (que ha iniciado sesión)
exports.listarPorUsuario = async (req, res) => {
    // Usamos req.user.id que debe estar disponible después de la autenticación con JWT
    const usuarioId = req.user.id;
    
    if (!usuarioId) {
        return res.status(400).send('Usuario no autenticado');
    }

    // Obtenemos las reservas del usuario autenticado
    const reservas = await Reserva.findAll({ where: { usuarioId } });
    res.render('reservas/lista', { reservas });
};

// Función para ver el detalle de una reserva
exports.detalle = async (req, res) => {
    try {
        // Obtener la reserva con el apartamento asociado
        const reserva = await Reserva.findByPk(req.params.id, {
            include: {
                model: Apartamento,   // Incluir el modelo Apartamento
                attributes: ['nombre'] // Solo cargar el nombre del apartamento
            }
        });

        if (!reserva) {
            return res.status(404).send('Reserva no encontrada');
        }

        // Comprobamos que el usuario es el que hizo la reserva
        if (reserva.usuarioId !== req.user.id) {
            return res.status(403).send('No tienes permiso para ver esta reserva');
        }

        // Renderizamos el detalle de la reserva
        res.render('reservas/detalle', { reserva, csrfToken: req.csrfToken() });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los detalles de la reserva');
    }
};

// Función para editar la reserva
exports.editar = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send('Datos inválidos');
    }

    const { fechaInicio, fechaFin } = req.body;
    try {
        const reserva = await Reserva.findByPk(req.params.id);
        
        if (!reserva) {
            return res.status(404).send('Reserva no encontrada');
        }

        // Comprobamos que el usuario es el que hizo la reserva
        if (reserva.usuarioId !== req.user.id) {
            return res.status(403).send('No tienes permiso para editar esta reserva');
        }

        // Actualizamos las fechas
        reserva.fechaInicio = fechaInicio;
        reserva.fechaFin = fechaFin;
        await reserva.save();

        // Redirigimos a la página de detalles de la reserva
        res.redirect(`/reservas/${reserva.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al editar la reserva');
    }
};

// Función para eliminar la reserva
exports.eliminar = async (req, res) => {
    try {
        const reserva = await Reserva.findByPk(req.params.id);
        
        if (!reserva) {
            return res.status(404).send('Reserva no encontrada');
        }

        // Comprobamos que el usuario es el que hizo la reserva
        if (reserva.usuarioId !== req.user.id) {
            return res.status(403).send('No tienes permiso para eliminar esta reserva');
        }

        // Eliminamos la reserva
        await reserva.destroy();

        // Redirigimos a la lista de reservas
        res.redirect('/reservas');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la reserva');
    }
}
