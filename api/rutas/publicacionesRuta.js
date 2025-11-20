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
  const publicacionDatos = req.body;
  publicacionesServicio.crearPublicacion(publicacionDatos)
  .then((publicacionCreada) => {
      res.json(publicacionCreada);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Ocurrió un error al crear la publicación");
    })
})

// router.put("/:", function(req, res, next){
//   const {usuario_id} = req.params;
//   const {nombre, user, pass} = req.body;

//   let sql = "UPDATE usuarios SET nombre = ?, user = ?, pass = ? WHERE id = ?";

//   db.query(sql, [nombre, user, pass, usuario_id])
//   .then(() => {
//     res.status(201).send("Guardado");
//   })
//   .catch((error) => {
//     console.error(error);
//     res.status(500).send("Ocurrió un error");
//   })
// })

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


