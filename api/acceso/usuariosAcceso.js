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
-- 1. Conteo de Publicaciones
LEFT JOIN (
    SELECT
        idUsuario,
        COUNT(idPublicacion) AS total_publicaciones
    FROM
        publicacion
    GROUP BY
        idUsuario
) p ON u.idUsuario = p.idUsuario

-- 2. Conteo de "Me Gusta" en Publicaciones del Usuario
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

-- 3. Conteo de Usuarios que el Perfil *SIGUE* (Emisor)
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

-- 4. Conteo de Usuarios que *SIGUEN* al Perfil (Receptor)
LEFT JOIN (
    SELECT
        idUsuarioReceptor,
        COUNT(idSolicitudAmistad) AS total_seguidores
    FROM
        solicitud_amistad
    WHERE
        estado = 'aceptada' -- Asumiendo que "seguir" es una solicitud aceptada
    GROUP BY
        idUsuarioReceptor
) seguidores ON u.idUsuario = seguidores.idUsuarioReceptor

WHERE
    u.idUsuario = ?; -- Reemplaza '?' con el ID de usuario deseado
  `;
  return db.query(sql, [idUsuario])
  .then(([usuario]) => {
    console.log('RESULTADO:', usuario);
    return usuario;
  })
  .catch((error) => {
    console.error('ERROR EN CONSULTA:', error);
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
  obtenerUsuarios, crearUsuario, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario
}
