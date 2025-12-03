const router = require('express').Router();
const usuariosServicio = require('../servicios/usuariosServicios');
const middleware = require('../middleware');

router.get("/", function(req, res, next){
  const { busqueda } = req.query;
  
  usuariosServicio.obtenerUsuarios(busqueda)
    .then((usuarios) => {
      res.json(usuarios);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Ocurrió un error al obtener usuarios");
    })
})

router.get("/administrador", middleware, function(req, res, next) {
  const { busqueda } = req.query;

  usuariosServicio.obtenerUsuariosAdmin(busqueda)
  .then((usuarios) => {
      res.json(usuarios);
    })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Ocurrió un error al obtener usuarios");
  })
})

router.get("/:idUsuario", function(req, res, next){
  const { busqueda } = req.query;
  const {idUsuario} = req.params;
  
  usuariosServicio.obtenerUsuarioPorId(idUsuario)
    .then((usuarios) => {
      res.json(usuarios);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Ocurrió un error al obtener usuarios");
    })
})

router.post("/", function(req, res, next){
  const usuarioDatos = req.body;
  //const {nombreUsuario, email, password, fotoPerfil, portada, apodo, biografiaPrincipal, biografiaSecundaria, privacidad} = req.body;
  //usuariosServicio.crearUsuario(nombreUsuario, email, password, fotoPerfil, portada, apodo, biografiaPrincipal, biografiaSecundaria, privacidad)
  usuariosServicio.crearUsuario(usuarioDatos)
  .then((usuarioCreado) => {
      res.json(usuarioCreado);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Ocurrió un error al crear el usuario");
    }) 
})

router.put("/:idUsuario", function(req, res, next){
  const {idUsuario} = req.params;
  const usuarioDatos = req.body.datos;
  //solo por el momento hasta el jwt
  const usuarioQueEdita = req.body.usuario;

  usuariosServicio.actualizarUsuario(idUsuario, usuarioDatos, usuarioQueEdita)
  .then((usuarioActualizado) => {
    res.json(usuarioActualizado);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Ocurrió un error al actualizar el usuario");
  })
})


router.delete("/:idUsuario", function(req, res, next){
  const {idUsuario} = req.params;

  usuariosServicio.eliminarUsuario(idUsuario)
  .then(() => {
    res.status(200).send("usuario eliminado");
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Ocurrió un error al eliminar el usuario");
  })
})


module.exports = router;
