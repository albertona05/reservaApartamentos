
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Reserva = require('./reserva');

const Apartamento = sequelize.define('Apartamento', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    timestamps: true, // Esto asegura que Sequelize gestionará 'createdAt' y 'updatedAt'
  });
  
Apartamento.hasMany(Reserva, { foreignKey: 'apartamentoId' });
Reserva.belongsTo(Apartamento, { foreignKey: 'apartamentoId' });


module.exports = Apartamento;
