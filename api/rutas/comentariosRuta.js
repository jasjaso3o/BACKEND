const router = require('express').Router();
const publicacionesServicio = require('../servicios/publicacionesServicios');

router.get("/", function(req, res, next){
  const { busqueda } = req.query;
  
  publicacionesServicio.obtenerPublicacionesBD(busqueda)
    .then((publicaciones) => {
      res.json(publicaciones);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Ocurrió un error al obtener publicaciones");
    })
})

router.post("/", function(req, res, next){
  const {idUsuario, titulo, descripcion, imagen} = req.body;
  publicacionesServicio.crearPublicacion(idUsuario, titulo, descripcion, imagen)
  .then((publicacionCreada) => {
      res.json(publicacionCreada);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Ocurrió un error al crear la publicación");
    })
})

router.delete("/:idPublicacion", function(req, res, next){
  const {idPublicacion} = req.params;

  publicacionesServicio.eliminarPublicacion(idPublicacion)
  .then(() => {
    res.status(200).send("eliminado");
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Ocurrió un error");
  })
})


module.exports = router;