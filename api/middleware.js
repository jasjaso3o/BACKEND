const { verificarToken } = require('@damianegreco/hashpass');
const { TOKEN_SECRET } = process.env;

function middleware(req, res, next) {
  const token = req.headers.authorization;

  const verificacion = verificarToken(token, TOKEN_SECRET);

  if (typeof verificacion === "string") {

    if (verificacion.startsWith("Token expirado")) {
      return res.status(401).send({
        error: "TOKEN_EXPIRADO",
        mensaje: verificacion
      });
    }

    return res.status(401).send({
      error: "TOKEN_INVALIDO",
      mensaje: verificacion
    });
  }

  req.user = verificacion.data;
  next();
}

module.exports = middleware;
