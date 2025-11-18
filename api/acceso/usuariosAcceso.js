const db = require('../conexion');

function obtenerUsuariosBD() {
const sql = `
  SELECT *
    FROM usuarios
  `;

  return db.query(sql)
  .then(([usuarios]) => {
    console.log('RESULTADO:', usuarios);
    return usuarios;
  })
  .catch((error) => {
    console.error('ERROR EN CONSULTA:', error);
    throw error;
  })
}

function crearUsuario({nombreUsuario, email, password, fotoPerfil, portada, apodo, biografiaPrincipal, biografiaSecundaria, privacidad}) {

  let sql = "INSERT INTO usuarios (nombreUsuario, email, password, fotoPerfil, portada, apodo, biografiaPrincipal, biografiaSecundaria, privacidad)";
  sql += " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  return db.query(sql, [nombreUsuario, email, password, fotoPerfil, portada, apodo, biografiaPrincipal, biografiaSecundaria, privacidad])
  .then((usuarioCreado) => {
    console.log('Usuario creado');  
    return usuarioCreado;
  })
  .catch((error) => {
    console.error(error);
    throw error;
  })
}

function actualizarUsuario(idUsuario, usuarioDatos) {
  const { nombreUsuario, fotoPerfil, portada, apodo, biografiaPrincipal, biografiaSecundaria, privacidad } = usuarioDatos;


  let sql = "UPDATE usuarios SET nombreUsuario = ?, fotoPerfil = ?, portada = ?, apodo = ?, biografiaPrincipal = ?, biografiaSecundaria = ?, privacidad = ? WHERE idUsuario = ?";
  return db.query(sql, [
    nombreUsuario,
    fotoPerfil,
    portada,
    apodo,
    biografiaPrincipal,
    biografiaSecundaria,
    privacidad,
    idUsuario
  ])
  .then(([result]) => {
    console.log("Usuario editado");
    return result;
  })
  .catch((error) => {
    console.error(error);
    throw error;
  });
}

function eliminarUsuario(idUsuario) {
  const sql = "DELETE FROM usuarios WHERE idUsuario = ?";
  return db.query(sql, [idUsuario])
  .then(() => {
    console.log('Usuario eliminado');
  })
  .catch((error) => {
    console.error(error);
    throw error;
  })
}


module.exports = {
  obtenerUsuariosBD, crearUsuario, actualizarUsuario, eliminarUsuario
}
