// const router = require('express').Router();

// const publicacionesRouter = require('./publicaciones/main');

// router.use("/publicaciones", publicacionesRouter);

// module.exports = router;

const router = require('express').Router();

const publicacionesRouter = require('./rutas/publicacionesRuta');
//const usuariosRouter = require('./usuarios/main');

router.use("/publicaciones", publicacionesRouter);
//router.use("/usuarios", usuariosRouter);

module.exports = router;