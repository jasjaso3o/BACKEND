const db = require('../conexion');

function obtenerComentariosPub(idPublicacion, limit, offset) {
  const sql = `
SELECT 
    u.idUsuario,
    u.fotoPerfil,
    u.nombreUsuario, 
    u.apodo,
    c.idComentario,
    c.contenido,
    c.fechaCreacion,
    COUNT(DISTINCT CASE WHEN r.tipo = 'me gusta' THEN r.idReaccion END) as meGusta,
    COUNT(DISTINCT CASE WHEN r.tipo = 'no me gusta' THEN r.idReaccion END) as noMeGusta
FROM comentarios c
LEFT JOIN usuarios u ON c.idUsuario = u.idUsuario
LEFT JOIN reacciones r ON c.idComentario = r.idComentario
WHERE c.idPublicacion = ?
GROUP BY 
    u.idUsuario, u.fotoPerfil, u.nombreUsuario, u.apodo, 
    c.idComentario, c.contenido, c.fechaCreacion
ORDER BY c.fechaCreacion DESC
LIMIT ? OFFSET ?;
  `;

  return db.query(sql, [idPublicacion, limit, offset])
  .then(([comentarios]) => {
    console.log('RESULTADO:', comentarios);
    return comentarios;
  })
  .catch((error) => {
    console.error('ERROR EN CONSULTA:', error);
    throw error;
  })
}

function crearComentario({contenido, idPublicacion, idUsuario}) {

  let sql = "INSERT INTO comentarios (contenido, idPublicacion, idUsuario)";
  sql += " VALUES (?, ?, ?)";

  return db.query(sql, [contenido, idPublicacion, idUsuario])
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
  obtenerComentariosPub, crearComentario, eliminarComentario
}