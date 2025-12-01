const router = require('express').Router();
const registroServicios = require('../servicios/registroServicios');

router.post('/', (req,res, next) => {
  const usuarioDatos = req.body;

  registroServicios.registrarse(usuarioDatos)
    .then((token) => {
      res.status(201).json({ status: "usuario registrado", token: token});
    })
    .catch(error => {
      console.error(error);
      const status = error.status || 500;
      const mensaje = error.mensaje || "Ocurrió un error al registrar el usuario";

      res.status(status).json({ mensaje });
    });
});

module.exports = router;