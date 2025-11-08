const router = require('express').Router();
const db = require('../conexion');
const middleware = require('../middleware');

// Aplicar middleware a todas las rutas
router.use(middleware);

// GET /api/publicaciones - Obtener feed
router.get("/", function(req, res, next){
  const { busqueda } = req.query;
  
  let sql = `
    SELECT 
      p.*,
      u.nombre_usuario,
      u.foto_perfil,
      u.nombre_completo,
      COUNT(DISTINCT l.id) as cantidad_likes,
      COUNT(DISTINCT c.id) as cantidad_comentarios
    FROM publicaciones p
    JOIN usuarios u ON p.usuario_id = u.id
    LEFT JOIN interacciones l ON p.id = l.publicacion_id AND l.tipo = 'like'
    LEFT JOIN interacciones c ON p.id = c.publicacion_id AND c.tipo = 'comentario'
  `;
  
  let busquedaParcial = busqueda;

  if (busqueda){
    sql += " WHERE p.contenido LIKE ? OR p.descripcion LIKE ?";
    busquedaParcial = `%${busqueda}%`;
  }

  sql += " GROUP BY p.id ORDER BY p.fecha_publicacion DESC";

  db.query(sql, busqueda ? [busquedaParcial, busquedaParcial] : [])
  .then(([publicaciones]) => {
    res.json(publicaciones);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Ocurrió un error");
  })
})

// POST /api/publicaciones - Crear publicación
router.post("/", function(req, res, next){
  const { contenido, descripcion, imagen_url, tipo } = req.body;
  const usuario_id = req.user.id;

  let sql = "INSERT INTO publicaciones (usuario_id, tipo, contenido, descripcion, imagen_url)";
  sql += " VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [usuario_id, tipo || 'texto', contenido, descripcion || null, imagen_url || null])
  .then(() => {
    res.status(201).send("Publicación creada");
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Ocurrió un error");
  })
})

// POST /api/publicaciones/like - Dar like
router.post("/like", function(req, res, next){
  const { publicacion_id } = req.body;
  const usuario_id = req.user.id;

  // Verificar si ya dio like
  const sqlVerificar = "SELECT id FROM interacciones WHERE usuario_id = ? AND publicacion_id = ? AND tipo = 'like'";
  
  db.query(sqlVerificar, [usuario_id, publicacion_id])
  .then(([existe]) => {
    if (existe.length > 0) {
      // Quitar like
      const sqlEliminar = "DELETE FROM interacciones WHERE usuario_id = ? AND publicacion_id = ? AND tipo = 'like'";
      return db.query(sqlEliminar, [usuario_id, publicacion_id])
        .then(() => {
          res.status(200).send("Like removido");
        });
    } else {
      // Dar like
      const sqlInsertar = "INSERT INTO interacciones (usuario_id, publicacion_id, tipo) VALUES (?, ?, 'like')";
      return db.query(sqlInsertar, [usuario_id, publicacion_id])
        .then(() => {
          res.status(201).send("Like agregado");
        });
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Ocurrió un error");
  })
})

// POST /api/publicaciones/comentario - Agregar comentario
router.post("/comentario", function(req, res, next){
  const { publicacion_id, contenido } = req.body;
  const usuario_id = req.user.id;

  const sql = "INSERT INTO interacciones (usuario_id, publicacion_id, tipo, contenido) VALUES (?, ?, 'comentario', ?)";

  db.query(sql, [usuario_id, publicacion_id, contenido])
  .then(() => {
    res.status(201).send("Comentario agregado");
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Ocurrió un error");
  })
})

module.exports = router;