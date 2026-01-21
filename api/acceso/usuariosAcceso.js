const db = require('../conexion');

function obtenerUsuarios() {
  const sql = `
  SELECT 
    idUsuario,
    nombreUsuario,
    fotoPerfil,
    portada,
    apodo,
    biografiaPrincipal,
    biografiaSecundaria,
    privacidad
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

function obtenerUsuariosAdmin() {
  const sql = `
  SELECT 
    idUsuario,
    nombreUsuario,
    fotoPerfil,
    portada,
    apodo,
    biografiaPrincipal,
    biografiaSecundaria,
    privacidad
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


function obtenerUsuarioPorId(idUsuario) {
  const sql = `SELECT
    u.idUsuario,
    u.nombreUsuario,
    u.apodo,
    u.fotoPerfil,
    u.portada,
    u.biografiaPrincipal,
    u.biografiaSecundaria,
    COALESCE(p.total_publicaciones, 0) AS totalPublicaciones,
    COALESCE(r.total_me_gusta, 0) AS totalMeGusta,
    COALESCE(sigue.total_seguidos, 0) AS totalSeguidos,
    COALESCE(seguidores.total_seguidores, 0) AS totalSeguidores
    FROM
    usuarios u
    LEFT JOIN (
    SELECT
        idUsuario,
        COUNT(idPublicacion) AS total_publicaciones
    FROM
        publicacion
    GROUP BY
        idUsuario
    ) p ON u.idUsuario = p.idUsuario
    LEFT JOIN (
    SELECT
        p.idUsuario,
        COUNT(r.idReaccion) AS total_me_gusta
    FROM
        publicacion p
    INNER JOIN
        reacciones r ON p.idPublicacion = r.idPublicacion
    WHERE
        r.tipo = 'me gusta'
    GROUP BY
        p.idUsuario
    ) r ON u.idUsuario = r.idUsuario
    LEFT JOIN (
    SELECT
        idUsuarioEmisor,
        COUNT(idSolicitudAmistad) AS total_seguidos
    FROM
        solicitud_amistad
    WHERE
        estado = 'aceptada' -- Asumiendo que "seguir" es una solicitud aceptada
    GROUP BY
        idUsuarioEmisor
    ) sigue ON u.idUsuario = sigue.idUsuarioEmisor
    LEFT JOIN (
    SELECT
        idUsuarioReceptor,
        COUNT(idSolicitudAmistad) AS total_seguidores
    FROM
        solicitud_amistad
    WHERE
        estado = 'aceptada'
    GROUP BY
        idUsuarioReceptor
    ) seguidores ON u.idUsuario = seguidores.idUsuarioReceptor

    WHERE
    u.idUsuario = ?;
  `;
  return db.query(sql, [idUsuario])
  .then(([usuario]) => {
    console.log('RESULTADO:', usuario);
    return usuario[0]||null;
  })
  .catch((error) => {
    console.error('ERROR EN CONSULTA:', error);
    throw error;
  })
}
    
function actualizarUsuario(idUsuario, campos) {
  const columnas = Object.keys(campos);

  const sql = `
    UPDATE usuarios
    SET ${columnas.map(c => `${c} = ?`).join(", ")}
    WHERE idUsuario = ?
  `;

  const valores = columnas.map(c => campos[c]);
  valores.push(idUsuario);

  return db.query(sql, valores)
    .then(([result]) => {
      console.log("Usuario editado parcialmente");
      return result;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
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


function eliminarUsuario(idUsuario) {
  const sql = "DELETE FROM usuarios WHERE idUsuario = ?";
  return db.query(sql, [idUsuario])
  .then((respuesta) => {
    console.log('Usuario eliminado', respuesta);
    console.log(idUsuario);

  })
  .catch((error) => {
    console.error(error);
    throw error;
  })
}


module.exports = {
  obtenerUsuarios, obtenerUsuariosAdmin, crearUsuario, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario
}
