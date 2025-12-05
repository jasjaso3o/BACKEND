const usuariosAcceso = require('../acceso/usuariosAcceso');

function obtenerUsuarios() {
  return usuariosAcceso.obtenerUsuarios();
}

function obtenerUsuariosAdmin() {
  return usuariosAcceso.obtenerUsuariosAdmin();
}

function obtenerUsuarioPorId(idUsuario) {
  return usuariosAcceso.obtenerUsuarioPorId(idUsuario);
}

function crearUsuario(usuarioDatos) {
  return usuariosAcceso.crearUsuario(usuarioDatos);
}

//usuarioQueEdita es para editar el usuario sin la clave jwt por ahora
function actualizarUsuario(idUsuario, usuarioDatos) {
  return usuariosAcceso.obtenerUsuarioPorId(idUsuario)
    .then(usuario => {
  
      if (!usuario) {
        const error = new Error("El usuario no existe");
        error.codigo = 404;
        throw error;
      }
  
      return usuariosAcceso.actualizarUsuario(idUsuario, usuarioDatos);
    })
    .then(() => ({
      ok: true,
      mensaje: "Usuario actualizado correctamente"
    }));
  
}

function eliminarUsuario(idUsuario) {
  console.log('fdfksdfdsf', idUsuario);
  
  return usuariosAcceso.eliminarUsuario(idUsuario);
}

function cerrarSesion(token) {
  
}

module.exports = {
  obtenerUsuarios, obtenerUsuariosAdmin, obtenerUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario
}