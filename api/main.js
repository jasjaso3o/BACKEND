const router = require('express').Router();

const publicacionesRouter = require('./rutas/publicacionesRuta');

router.use("/publicaciones", publicacionesRouter);

const usuariosRouter = require('./rutas/usuariosRuta');

router.use("/usuarios", usuariosRouter);

const comentariosRouter = require('./rutas/comentariosRuta');

router.use("/comentarios", comentariosRouter);

const loginRouter = require('./rutas/loginRuta');

router.use("/login", loginRouter);

module.exports = router;