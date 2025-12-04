const router = require('express').Router();
const loginServicios = require('../servicios/loginServicios');

router.get('/', (req, res) => {
  res.status(200).send("Servicio de login activo");
});

router.post('/', (req, res) => {
  const { nombreUsuario, password } = req.body;

  loginServicios.iniciarSesion(nombreUsuario, password)
    .then(resultado => {
      res.status(200).json({ status: "ok", token: resultado.token });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Ocurrió un error");
    });
});

module.exports = router;
