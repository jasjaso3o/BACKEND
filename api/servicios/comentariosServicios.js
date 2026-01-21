const comentariosAcceso = require('../acceso/comentariosAcceso');

function obtenerComentariosPub(idPublicacion, limit, offset) {
  return comentariosAcceso.obtenerComentariosPub(idPublicacion, limit, offset);
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