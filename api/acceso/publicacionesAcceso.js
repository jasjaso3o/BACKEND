const db = require('../conexion');

function obtenerPublicacionesBD() {
  const sql = `
    SELECT 
      p.idPublicacion,
      p.titulo,
      p.descripcion,
      u.nombreUsuario
    FROM publicacion p
    JOIN usuarios u ON p.idUsuario = u.idUsuario
  `;
  console.log('EJECUTANDO SQL:', sql);

  return db.query(sql)
  .then(([publicaciones]) => {
    console.log('RESULTADO:', publicaciones);
    return publicaciones;
  })
  .catch((error) => {
    console.error('ERROR EN CONSULTA:', error);
    throw error;
  })
}

module.exports = {
  obtenerPublicacionesBD
}

// SELECT 
//       u.idUsuario,
//       u.fotoPerfil,
//       u.nombreUsuario, 
//       u.apodo,
//       p.idPublicacion,
//       p.titulo,
//       p.descripcion,
//       p.imagen,
//       p.fechaCreacion,
//       COUNT(DISTINCT CASE WHEN r.tipo = 'me gusta' THEN r.idReaccion END) as meGusta,
//       COUNT(DISTINCT CASE WHEN r.tipo = 'no me gusta' THEN r.idReaccion END) as noMeGusta,
//       COUNT(DISTINCT CASE WHEN r.tipo = 'comentario' THEN r.idReaccion END) as comentarios
//     FROM publicacion p
//     JOIN usuarios u ON p.idUsuario = u.idUsuario
//     JOIN reacciones r ON p.idPublicacion = r.idPublicacion
//     GROUP BY p.idPublicacion
//     ORDER BY p.fechaCreacion DESC