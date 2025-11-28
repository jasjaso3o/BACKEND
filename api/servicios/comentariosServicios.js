const comentariosAcceso = require('../acceso/comentariosAcceso');

function obtenerComentarios(idPublicacion) {
  return comentariosAcceso.obtenerComentarios(idPublicacion);
}

function crearComentario(comentarioDatos) {
  return comentariosAcceso.crearComentario(comentarioDatos);
}

function eliminarComentario(idComentario) {
  return comentariosAcceso.eliminarComentario(idComentario);
}


module.exports = {
  obtenerComentarios, crearComentario, eliminarComentario
}