const publicacionesAcceso = require('../acceso/publicacionesAcceso');

function obtenerPublicacionesBD() {
  return publicacionesAcceso.obtenerPublicacionesBD();
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
  obtenerPublicacionesBD, crearPublicacion, eliminarPublicacion
}