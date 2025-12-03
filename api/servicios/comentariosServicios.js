const comentariosAcceso = require('../acceso/comentariosAcceso');

function obtenerComentariosPub(idPublicacion) {
  return comentariosAcceso.obtenerComentariosPub(idPublicacion);
}

function crearComentario(comentarioDatos) {
  return comentariosAcceso.crearComentario(comentarioDatos);
}

function eliminarComentario(idComentario) {
  return comentariosAcceso.eliminarComentario(idComentario);
}


module.exports = {
  obtenerComentariosPub, crearComentario, eliminarComentario
}