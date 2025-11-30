const router = require('express').Router();
const registroServicios = require('../servicios/registroServicios');

router.post('/', (req,res, next) => {
  const usuarioDatos = req.body;

  registroServicios.registrarse(usuarioDatos)
    .then(() => {
      res.status(201).json({ status: "ok", token: token });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Ocurrió un error al registrar el usuario");
    });
});

module.exports = router;