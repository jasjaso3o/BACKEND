const router = require('express').Router();
const publicacionesServicio = require('../servicios/publicacionesServicios');

// GET /api/publicaciones - Obtener feed de publicaciones
router.get("/", function(req, res, next){
  const { busqueda } = req.query;
  
  publicacionesServicio.obtenerPublicaciones(busqueda)
    .then((publicaciones) => {
      res.json(publicaciones);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Ocurrió un error al obtener publicaciones");
    })
})

module.exports = router;


