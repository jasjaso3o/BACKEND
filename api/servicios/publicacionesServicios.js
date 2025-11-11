const publicacionesAcceso = require('../acceso/publicacionesAcceso');

function obtenerPublicaciones() {
  return publicacionesAcceso.obtenerPublicacionesBD();
}

module.exports = {
  obtenerPublicaciones
}