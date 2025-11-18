const publicacionesAcceso = require('../acceso/publicacionesAcceso');

function obtenerPublicacionesBD() {
  return publicacionesAcceso.obtenerPublicacionesBD();
}

function crearPublicacion(idUsuario, titulo, descripcion, imagen) {
  return publicacionesAcceso.crearPublicacion(idUsuario, titulo, descripcion, imagen);
}

function eliminarPublicacion(idPublicacion) {
  return publicacionesAcceso.eliminarPublicacion(idPublicacion);
}

module.exports = {
  obtenerPublicacionesBD, crearPublicacion, eliminarPublicacion
}