const db = require('../conexion');

async function duplicadosNombreUsuario(nombreUsuario) {
  const sql = 'SELECT idUsuario FROM usuarios WHERE nombreUsuario = ?';
  const [rows] = await db.query(sql, [nombreUsuario]);
  return rows.length > 0 ? rows[0] : null;
}

async function duplicadosEmail(email) {
  const sql = 'SELECT idUsuario FROM usuarios WHERE email = ?';
  const [rows] = await db.query(sql, [email]);
  return rows.length > 0 ? rows[0] : null;
}

async function registrarse({nombreUsuario, apodo, email, password}) {
  
  let sql = "INSERT INTO usuarios (nombreUsuario, apodo, email, password, privacidad, rol)";
  sql += " VALUES (?, ?, ?, ?, 'publica', 'usuario')";

  return db.query(sql, [nombreUsuario, apodo, email, password])
  .then((usuarioCreado) => {
    console.log('Usuario creado');  
    return usuarioCreado;
  })
  .catch((error) => {
    console.error(error);
    throw error;
  })
}

module.exports = {
  duplicadosNombreUsuario, duplicadosEmail, registrarse
}