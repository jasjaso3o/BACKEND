const comentariosAcceso = require('../acceso/comentariosAcceso');

function obtenerComentarios() {
  return comentariosAcceso.obtenerComentarios();
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