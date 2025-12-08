const db = require('../conexion');

function obtenerPublicacionesBD(limit, offset) {
const sql = `
  SELECT 
      u.idUsuario,
      u.fotoPerfil,
      u.nombreUsuario, 
      u.apodo,
      p.idPublicacion,
      p.titulo,
      p.descripcion,
      p.imagen,
      p.fechaCreacion,
      COUNT(DISTINCT CASE WHEN r.tipo = 'me gusta' THEN r.idReaccion END) as meGusta,
      COUNT(DISTINCT CASE WHEN r.tipo = 'no me gusta' THEN r.idReaccion END) as noMeGusta,
      COUNT(DISTINCT CASE WHEN r.tipo = 'comentario' THEN r.idReaccion END) as comentarios
    FROM publicacion p
    LEFT JOIN usuarios u ON p.idUsuario = u.idUsuario
    LEFT JOIN reacciones r ON p.idPublicacion = r.idPublicacion
    GROUP BY p.idPublicacion
    ORDER BY p.fechaCreacion DESC
    LIMIT ? OFFSET ?
  `;

  return db.query(sql, [limit, offset])
  .then(([publicaciones]) => {
    console.log('RESULTADO:', publicaciones);
    return publicaciones;
  })
  .catch((error) => {
    console.error('ERROR EN CONSULTA:', error);
    throw error;
  })
}

function obtenerTotalPubs() {
  const sql = `SELECT COUNT(*) AS total FROM publicacion`;
  return db.query(sql)
  .then(([rows]) => {
    return rows[0].total;
  })}

function obtenerTotalPubsUsuario(idUsuario) {
  const sql = `SELECT COUNT(*) AS total 
    FROM publicacion p LEFT JOIN usuarios u on p.idUsuario = u.idUsuario
    WHERE p.idUsuario = ? 
  `;
  return db.query(sql, [idUsuario])
  .then(([rows]) => {
    return rows[0].total;
  })}

function obtenerPublicacionesPorUsuario (idUsuario, limit, offset) {
  const sql = `
    SELECT 
      u.idUsuario,
      u.fotoPerfil,
      u.nombreUsuario, 
      u.apodo,
      p.idPublicacion,
      p.titulo,
      p.descripcion,
      p.imagen,
      p.fechaCreacion,
      COUNT(DISTINCT CASE WHEN r.tipo = 'me gusta' THEN r.idReaccion END) as meGusta,
      COUNT(DISTINCT CASE WHEN r.tipo = 'no me gusta' THEN r.idReaccion END) as noMeGusta,
      COUNT(DISTINCT CASE WHEN r.tipo = 'comentario' THEN r.idReaccion END) as comentarios
    FROM publicacion p
    LEFT JOIN usuarios u ON p.idUsuario = u.idUsuario
    LEFT JOIN reacciones r ON p.idPublicacion = r.idPublicacion
    WHERE p.idUsuario = ?
    GROUP BY p.idPublicacion
    ORDER BY p.fechaCreacion DESC
    LIMIT ? OFFSET ?
  `;
  return db.query(sql, [idUsuario, limit, offset])
  .then(([publicaciones]) => {
    console.log('RESULTADO:', publicaciones);
    return publicaciones;
  })
  .catch((error) => {
    console.error('ERROR EN CONSULTA:', error);
    throw error;
  })
}

function obtenerPublicacion (idPublicacion) {
  const sql = `
    SELECT 
      u.idUsuario,
      u.fotoPerfil,
      u.nombreUsuario, 
      u.apodo,
      p.idPublicacion,
      p.titulo,
      p.descripcion,
      p.imagen,
      p.fechaCreacion,
      COUNT(DISTINCT CASE WHEN r.tipo = 'me gusta' THEN r.idReaccion END) as meGusta,
      COUNT(DISTINCT CASE WHEN r.tipo = 'no me gusta' THEN r.idReaccion END) as noMeGusta,
      COUNT(DISTINCT CASE WHEN r.tipo = 'comentario' THEN r.idReaccion END) as comentarios
    FROM publicacion p
    LEFT JOIN usuarios u ON p.idUsuario = u.idUsuario
    LEFT JOIN reacciones r ON p.idPublicacion = r.idPublicacion
    WHERE p.idPublicacion = ?
    GROUP BY p.idPublicacion
    ORDER BY p.fechaCreacion DESC
  `;
  return db.query(sql, [idPublicacion])
  .then(([publicacion]) => {
    console.log('RESULTADO:', publicacion);
    return publicacion;
  })
  .catch((error) => {
    console.error('ERROR EN CONSULTA:', error);
    throw error;
  })
}

function crearPublicacion({idUsuario, titulo, descripcion, imagen}) {
  
  let sql = "INSERT INTO publicacion (idUsuario, titulo, descripcion, imagen)";
  sql += " VALUES (?, ?, ?, ?)";

  return db.query(sql, [idUsuario, titulo, descripcion, imagen])
  .then((publicacionCreada) => {
    console.log('Publicación creada');  
    return publicacionCreada;
  })
  .catch((error) => {
    console.error(error);
    throw error;
  })
}

function buscarPorId(idPublicacion) {
  const sql = "SELECT * FROM publicacion WHERE idPublicacion = ?";
  return db.query(sql, [idPublicacion])
    .then(([rows]) => rows.length ? rows[0] : null);
}

function eliminarPublicacion(idPublicacion) {
  const sql = "DELETE FROM publicacion WHERE idPublicacion = ?";
  return db.query(sql, [idPublicacion])
  .then(() => {
    console.log('Publicación eliminada');
  })
  .catch((error) => {
    console.error(error);
    throw error;
  })
}

module.exports = {
  obtenerPublicacionesBD, obtenerTotalPubs, obtenerTotalPubsUsuario, obtenerPublicacionesPorUsuario, obtenerPublicacion, crearPublicacion, eliminarPublicacion, buscarPorId
}

