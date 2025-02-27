const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('reservas_db', 'root', 'userpass', {
    host: 'localhost',  // Asegúrate de que es localhost
    dialect: 'mysql',
    port: 3306,  // Puerto correcto
  });

// Intentar autenticar la conexión
async function comprobarConexion() {
    try {
      await sequelize.authenticate();
      console.log('La conexión a la base de datos se ha establecido correctamente.');
    } catch (error) {
      console.error('No se pudo conectar a la base de datos:', error);
    }
  }
  
  // Llamamos a la función para comprobar la conexión
  comprobarConexion();
  

module.exports = sequelize;
