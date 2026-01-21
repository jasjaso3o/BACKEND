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

function actualizarUsuario(idUsuario, usuarioDatos) {
  return usuariosAcceso.obtenerUsuarioPorId(idUsuario)
    .then(usuarioActual => {

      if (!usuarioActual) {
        const error = new Error("El usuario no existe");
        error.codigo = 404;
        throw error;
      }

      const camposPermitidos = [
        "nombreUsuario",
        "fotoPerfil",
        "portada",
        "apodo",
        "biografiaPrincipal",
        "biografiaSecundaria",
        "privacidad"
      ];

      const camposActualizados = {};
        //modificar ifs
      camposPermitidos.forEach(campo => {
        const nuevoValor = usuarioDatos[campo];

        if (nuevoValor === "" || nuevoValor === null || nuevoValor === undefined) {
          return;
        }

        camposActualizados[campo] = nuevoValor;
      });

      if (Object.keys(camposActualizados).length === 0) {
        return { ok: true, mensaje: "No hubo cambios" };
      }

      return usuariosAcceso.actualizarUsuario(idUsuario, camposActualizados);
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