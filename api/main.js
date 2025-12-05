const router = require('express').Router();
//const middleware = require('./middleware');


const publicacionesRouter = require('./rutas/publicacionesRuta');

router.use("/publicaciones", publicacionesRouter);

const usuariosRouter = require('./rutas/usuariosRuta');

router.use("/usuarios", usuariosRouter);

const comentariosRouter = require('./rutas/comentariosRuta');

router.use("/comentarios", comentariosRouter);

const loginRouter = require('./rutas/loginRuta');

router.use("/login", loginRouter);

const registroRouter = require('./rutas/registroRuta');

router.use("/signup", registroRouter);

//app.use('/public', express.static('public'));


module.exports = router;