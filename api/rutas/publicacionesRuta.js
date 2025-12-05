const router = require('express').Router();
const publicacionesServicio = require('../servicios/publicacionesServicios');
const middleware = require('../middleware');

router.get("/", function(req, res, next){
  //const { busqueda} = req.query;
  const limit = Number(req.query.limit) || 20;  
  const offset = Number(req.query.offset) || 0;
  
  publicacionesServicio.obtenerPublicacionesBD(limit, offset)
    .then((publicaciones) => {
      console.log(publicaciones, 'hola');
      
      res.json(publicaciones);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Ocurrió un error al obtener publicaciones");
    })
})

router.get("/usuario/:idUsuario", function(req, res, next){
  const { idUsuario } = req.params;
  const { busqueda } = req.query;
  
  publicacionesServicio.obtenerPublicacionesPorUsuario(idUsuario, busqueda)
    .then((publicaciones) => res.json(publicaciones))
    .catch((error) => {
      console.error(error);
      res.status(500).send("Ocurrió un error al obtener publicaciones del usuario");
    });
})

router.get("/:idPublicacion", function(req, res, next){
  const { idPublicacion } = req.params;
  const { busqueda } = req.query;
  
  publicacionesServicio.obtenerPublicacion(idPublicacion, busqueda)
    .then((publicacion) => res.json(publicacion))
    .catch((error) => {
      console.error(error);
      res.status(500).send("Ocurrió un error al obtener la publicación");
    });
})

router.post("/", middleware, function(req, res, next){
  const publicacionDatos = req.body;
  console.log('Datos de la publicación recibidos en la ruta:', publicacionDatos);
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


