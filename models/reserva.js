const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reserva = sequelize.define('Reserva', {
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    apartamentoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    timestamps: true,  // Esto asegura que Sequelize gestionará 'createdAt' y 'updatedAt'
});

module.exports = Reserva;
