const router = require('express').Router();
const db = require('../conexion');

const loginRouter = require('./login');

router.use("/login", loginRouter);

// GET /api/usuarios - Listar usuarios (para búsqueda)
router.get("/", function(req, res, next){
  const { busqueda } = req.query;
  
  let sql = "SELECT id, nombre_usuario, nombre_completo, foto_perfil FROM usuarios";
  let busquedaParcial = busqueda;

  if (busqueda){
    sql += " WHERE nombre_usuario LIKE ? OR nombre_completo LIKE ?";
    busquedaParcial = `%${busqueda}%`;
  }

  db.query(sql, busqueda ? [busquedaParcial, busquedaParcial] : [])
  .then(([usuarios]) => {
    res.json(usuarios);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Ocurrió un error");
  })
})

// POST /api/usuarios - Registrar usuario
router.post("/", function(req, res, next){
  const { email, nombre_usuario, nombre_completo, pass } = req.body;

  let sql = "INSERT INTO usuarios (email, nombre_usuario, nombre_completo, pass)";
  sql += " VALUES (?, ?, ?, ?)";

  const { hashPass } = require('@damianegreco/hashpass');
  const passHash = hashPass(pass);

  db.query(sql, [email, nombre_usuario, nombre_completo, passHash])
  .then(() => {
    res.status(201).send("Usuario registrado");
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Ocurrió un error");
  })
})

module.exports = router;