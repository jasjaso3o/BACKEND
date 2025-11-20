const publicacionesAcceso = require('../acceso/publicacionesAcceso');

function obtenerPublicacionesBD() {
  return publicacionesAcceso.obtenerPublicacionesBD();
}

function crearPublicacion(publicacionDatos) {
  return publicacionesAcceso.crearPublicacion(publicacionDatos);
}

function eliminarPublicacion(idPublicacion) {
  return publicacionesAcceso.eliminarPublicacion(idPublicacion);
}

module.exports = {
  obtenerPublicacionesBD, crearPublicacion, eliminarPublicacion
}