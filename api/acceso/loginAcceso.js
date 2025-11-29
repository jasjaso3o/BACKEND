const db = require('../conexion');

function buscarPorNombreUsuario(nombreUsuario) {
  const sql = `
    SELECT idUsuario, apodo, nombreUsuario, password
    FROM usuarios
    WHERE nombreUsuario = ?
  `;

  return db.query(sql, [nombreUsuario])
    .then(([rows]) => rows.length === 1 ? rows[0] : null);
}

module.exports = {
  buscarPorNombreUsuario
};
