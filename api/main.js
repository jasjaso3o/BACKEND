const router = require('express').Router();
const middleware = require('./middleware');


const publicacionesRouter = require('./rutas/publicacionesRuta');

router.use("/publicaciones", /*middleware*/publicacionesRouter);

const usuariosRouter = require('./rutas/usuariosRuta');

router.use("/usuarios", /*middleware*/ usuariosRouter);

const comentariosRouter = require('./rutas/comentariosRuta');

router.use("/comentarios", /*middleware*/ comentariosRouter);

const loginRouter = require('./rutas/loginRuta');

router.use("/login", loginRouter);

const registroRouter = require('./rutas/registroRuta');

router.use("/signup", registroRouter);

const fotosRouter = require('./rutas/fotosRuta')
router.use("/fotos", fotosRouter)

module.exports = router;