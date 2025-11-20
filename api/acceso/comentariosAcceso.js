const db = require('../conexion');

function obtenerComentarios() {
  const sql = `
    SELECT *
      FROM comentarios
  `;

  return db.query(sql)
  .then(([comentarios]) => {
    console.log('RESULTADO:', comentarios);
    return comentarios;
  })
  .catch((error) => {
    console.error('ERROR EN CONSULTA:', error);
    throw error;
  })
}

function crearComentario({idUsuario, contenido, idPublicacion}) {

  let sql = "INSERT INTO comentarios (idUsuario, contenido, idPublicacion)";
  sql += " VALUES (?, ?, ?)";

  return db.query(sql, [idUsuario, contenido, idPublicacion])
  .then((comentarioCreado) => {
    console.log('Comentario creado');  
    return comentarioCreado;
  })
  .catch((error) => {
    console.error(error);
    throw error;
  })

}

function eliminarComentario(idComentario) {
  const sql = "DELETE FROM comentarios WHERE idComentario = ?";
  return db.query(sql, [idComentario])
  .then(() => {
    console.log('Comentario eliminado');
  })
  .catch((error) => {
    console.error(error);
    throw error;
  });
}

module.exports = {
  obtenerComentarios, crearComentario, eliminarComentario
}