const router = require('express').Router();
const fs = require('fs');
const path = require('path');

// GET dinámico que lee todas las imágenes de /public/portadas
router.get("/portada", (req, res) => {
  const carpetaPortadas = path.join(__dirname, "../../public/portadas");

  fs.readdir(carpetaPortadas, (err, archivos) => {
    if (err) {
      console.error("Error al leer la carpeta de portadas:", err);
      return res.status(500).json({
        error: "No se pudo obtener las portadas"
      });
    }

    // Convertimos cada archivo en su URL pública final
    const fotos = archivos.map(nombre => `/public/portadas/${nombre}`);

    res.json(fotos);
  });
});

router.get("/fotosperfil", (req, res) => {
  const carpetaPortadas = path.join(__dirname, "../../public/portadas");

  fs.readdir(carpetaPortadas, (err, archivos) => {
    if (err) {
      console.error("Error al leer la carpeta de portadas:", err);
      return res.status(500).json({
        error: "No se pudo obtener las portadas"
      });
    }

    // Convertimos cada archivo en su URL pública final
    const fotos = archivos.map(nombre => `/public/portadas/${nombre}`);

    res.json(fotos);
  });
});

module.exports = router;
