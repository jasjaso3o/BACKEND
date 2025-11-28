const router = require('express').Router();
const db = require('../conexion');

const { verificarPass, generarToken } = require('@damianegreco/hashpass');

const {TOKEN_SECRET} = process.env;

router.get('/', function(req, res, next){
  res.status(200).send("Servicio de login activo");
});

router.post('/', function(req, res, next){
  const {nombreUsuario, password} = req.body;

  let sql = "SELECT idUsuario, apodo, nombreUsuario, password FROM usuarios";
  sql += " WHERE nombreUsuario = ?";

  db.query(sql, [nombreUsuario])
  .then(([usuarios]) => {
    if (usuarios && usuarios.length === 1
    ){
      const usuario = usuarios[0];
      if (verificarPass(password, usuario.password)){
        //El usuario y pass son correctos

        const token = generarToken(
          TOKEN_SECRET, 
          4, 
          { nombreUsuario: usuario.nombreUsuario, user: usuario.rol }
        )

        res.status(200).json({status:"ok", token});
      } else {
        console.error("Usuario no encontrado");
        res.status(401).send("Usuario y/o contraseña incorrecto");
      }
    } else {
      console.error("Usuario no encontrado");
      res.status(401).send("Usuario y/o contraseña incorrecto");
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Ocurrio un error");
  })
})

module.exports = router;