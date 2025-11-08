const router = require('express').Router();

const publicacionesRouter = require('./publicaciones/main');

router.use("/publicaciones", publicacionesRouter);

module.exports = router;