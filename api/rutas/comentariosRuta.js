const router = require('express').Router();
const middleware = require('../middleware');
const comentariosServicio = require('../servicios/comentariosServicios');

router.get("/:idPublicacion", function(req, res){
  const { idPublicacion } = req.params;
  const limit = Number(req.query.limit) || 10;  
  const offset = Number(req.query.offset) || 0;
  
  
  comentariosServicio.obtenerComentariosPub(idPublicacion, limit, offset)
    .then((comentarios) => {
      res.json(comentarios);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Ocurrió un error al traer los comentarios");
    })
})

router.post("/", middleware, function(req, res, next){
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

router.delete("/:idComentario", middleware,function(req, res, next){
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