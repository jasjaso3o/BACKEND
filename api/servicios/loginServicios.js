// loginServicios.js
const { verificarPass, generarToken, hashPass } = require('@damianegreco/hashpass');
const loginAcceso = require('../acceso/loginAcceso');



const { TOKEN_SECRET } = process.env;

function iniciarSesion(nombreUsuario, password) {
  return loginAcceso.buscarPorNombreUsuario(nombreUsuario)
    .then(usuario => {
      if (!usuario) {
        throw { codigo: 401, mensaje: "Usuario y/o contraseña incorrecto" };
      }
      
      //console.log(hashPass(password));
      
      const passOK = verificarPass(password, usuario.password);

      if (!passOK) {
        throw { codigo: 401, mensaje: "Usuario y/o contraseña incorrecto" };
      }

      const token = generarToken(
        TOKEN_SECRET,
        4,
        { nombreUsuario: usuario.nombreUsuario, user: usuario.rol }
      );

      return { token };
    });
}

module.exports = {
  iniciarSesion
};
