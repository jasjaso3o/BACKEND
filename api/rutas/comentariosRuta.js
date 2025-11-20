const router = require('express').Router();
const comentariosServicio = require('../servicios/comentariosServicios');

router.get("/", function(req, res, next){
  const { busqueda } = req.query;
  
  comentariosServicio.obtenerComentarios(busqueda)
    .then((comentarios) => {
      res.json(comentarios);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Ocurrió un error al traer los comentarios");
    })
})

router.post("/", function(req, res, next){
  const comentarioDatos = req.body;
  comentariosServicio.crearComentario(comentarioDatos)
  .then((comentarioCreado) => {
      res.json(comentarioCreado);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Ocurrió un error al crear el comentario");
    })
})

router.delete("/:idComentario", function(req, res, next){
  const {idComentario} = req.params;

  comentariosServicio.eliminarComentario(idComentario)
  .then(() => {
    res.status(200).send("eliminado");
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Ocurrió un error");
  })
})


module.exports = router;