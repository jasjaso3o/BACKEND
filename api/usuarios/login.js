const router = require('express').Router();
const db = require('../conexion');

const { hashPass, verifyPass, generarToken } = require('@damianegreco/hashpass');

const {TOKEN_SECRET} = process.env;

// POST /api/usuarios/login - Iniciar sesión
router.post("/", function(req, res, next){
  const { email, pass } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ?";

  db.query(sql, [email])
  .then(([usuarios]) => {
    if (usuarios.length === 0) {
      return res.status(401).send("Usuario no encontrado");
    }

    const usuario = usuarios[0];
    const passValida = verifyPass(pass, usuario.pass);

    if (passValida) {
      const token = generarToken(usuario, TOKEN_SECRET);
      res.json({
        token,
        usuario: {
          id: usuario.id,
          nombre_usuario: usuario.nombre_usuario,
          nombre_completo: usuario.nombre_completo,
          email: usuario.email,
          foto_perfil: usuario.foto_perfil
        }
      });
    } else {
      res.status(401).send("Contraseña incorrecta");
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Ocurrió un error");
  })
})

module.exports = router;