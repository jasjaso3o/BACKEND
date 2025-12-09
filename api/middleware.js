const { verificarToken } = require('@damianegreco/hashpass');
const { TOKEN_SECRET } = process.env;

function middleware(req, res, next) {
  const token = req.headers.authorization;

  const verificacion = verificarToken(token, TOKEN_SECRET);

  // Si es un mensaje de error:
  if (typeof verificacion === "string") {

    // Token expirado
    if (verificacion.startsWith("Token expirado")) {
      return res.status(401).send({
        error: "TOKEN_EXPIRADO",
        mensaje: verificacion
      });
    }

    // Otros errores
    return res.status(401).send({
      error: "TOKEN_INVALIDO",
      mensaje: verificacion
    });
  }

  // Si está todo bien:
  req.user = verificacion.data;
  next();
}

module.exports = middleware;
