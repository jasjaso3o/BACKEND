const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get("/portada", (req, res) => {
  const carpetaPortadas = path.join(__dirname, "../../public/portadas");

  fs.readdir(carpetaPortadas, (err, archivos) => {
    if (err) {
      console.error("Error al leer la carpeta de portadas:", err);
      return res.status(500).json({
        error: "No se pudo obtener las portadas"
      });
    }

    const fotos = archivos.map(nombre => `/public/portadas/${nombre}`);

    res.json(fotos);
  });
});

router.get("/perfil", (req, res) => {
  const carpetaPortadas = path.join(__dirname, "../../public/fotosPerfil");

  fs.readdir(carpetaPortadas, (err, archivos) => {
    if (err) {
      console.error("Error al leer la carpeta de fotosPerfil:", err);
      return res.status(500).json({
        error: "No se pudo obtener las fotos de perfil"
      });
    }

    // Convertimos cada archivo en su URL pública final
    const fotos = archivos.map(nombre => `/public/fotosPerfil/${nombre}`);


    //ejemplo para traer una sola imagen
    //http://localhost:3606/public/fotosPerfil/image (3).png

    //para traer todas las fotos
    //http://localhost:3606/api/fotos/perfil
    res.json(fotos);
  });
});

router.get("/fondoPublicaciones", (req, res) => {
  const carpetaPortadas = path.join(__dirname, "../../public/fotosPerfilPublicaciones");

  fs.readdir(carpetaPortadas, (err, archivos) => {
    if (err) {
      console.error("Error al leer la carpeta de fotosPerfilPublicaciones:", err);
      return res.status(500).json({
        error: "No se pudo obtener las fotos de fondo de publicaciones"
      });
    }

    const fotos = archivos.map(nombre => `/public/fotosPerfilPublicaciones/${nombre}`);
    res.json(fotos);
  });
});

module.exports = router;
