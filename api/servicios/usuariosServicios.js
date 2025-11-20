const usuariosAcceso = require('../acceso/usuariosAcceso');

function obtenerUsuarios() {
  return usuariosAcceso.obtenerUsuarios();
}

function crearUsuario(usuarioDatos /*nombreUsuario, email, password, fotoPerfil, portada, apodo, biografiaPrincipal, biografiaSecundaria, privacidad*/) {
  return usuariosAcceso.crearUsuario(usuarioDatos/*nombreUsuario, email, password, fotoPerfil, portada, apodo, biografiaPrincipal, biografiaSecundaria, privacidad*/);
}

function actualizarUsuario(idUsuario, usuarioDatos) {
  return usuariosAcceso.actualizarUsuario(idUsuario, usuarioDatos);
}

function eliminarUsuario(idUsuario) {
  console.log('fdfksdfdsf', idUsuario);
  
  return usuariosAcceso.eliminarUsuario(idUsuario);
}

module.exports = {
  obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario
}