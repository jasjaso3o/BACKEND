const publicacionesAcceso = require('../acceso/publicacionesAcceso');

function obtenerPublicacionesBD(limit, offset) {
  return publicacionesAcceso.obtenerPublicacionesBD(limit, offset);
}

function obtenerPublicacionesPorUsuario(idUsuario) {
  return publicacionesAcceso.obtenerPublicacionesPorUsuario(idUsuario);
}

function obtenerPublicacion(idPublicacion) {
  return publicacionesAcceso.obtenerPublicacion(idPublicacion);
}

function crearPublicacion(publicacionDatos) {
  return publicacionesAcceso.crearPublicacion(publicacionDatos);
}

function eliminarPublicacion(idPublicacion) {
  return publicacionesAcceso.buscarPorId(idPublicacion)
    .then(publicacion => {
      
      if (!publicacion) {
        const error = new Error("La publicación no existe");
        error.codigo = 404;
        throw error;
      }

      return publicacionesAcceso.eliminarPublicacion(idPublicacion);
    })
    .then(() => ({
      ok: true,
      mensaje: "Publicación eliminada correctamente"
    }));
}

module.exports = {
  obtenerPublicacionesBD, obtenerPublicacionesPorUsuario, obtenerPublicacion, crearPublicacion, eliminarPublicacion
}