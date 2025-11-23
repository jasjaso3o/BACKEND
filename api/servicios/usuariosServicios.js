const usuariosAcceso = require('../acceso/usuariosAcceso');

function obtenerUsuarios() {
  return usuariosAcceso.obtenerUsuarios();
}

function crearUsuario(usuarioDatos) {
  return usuariosAcceso.crearUsuario(usuarioDatos);
}

//usuarioQueEdita es para editar el usuario sin la clave jwt por ahora
function actualizarUsuario(idUsuario, usuarioDatos, usuarioQueEdita) {
  return usuariosAcceso.buscarPorId(idUsuario)
    .then(usuario => {
  
      // ❌ No existe → Error 404
      if (!usuario) {
        const error = new Error("El usuario no existe");
        error.codigo = 404;
        throw error;
      }
  
      // 2️⃣ Verificar permiso (temporal hasta usar JWT)
      if (usuario.idUsuario !== usuarioQueEdita.idUsuario) {
        const error = new Error("No puedes editar los datos de otro usuario");
        error.codigo = 403;
        throw error;
      }
  
      // 3️⃣ Editar usuario
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

module.exports = {
  obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario
}