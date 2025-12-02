const loginAcceso = require('../acceso/loginAcceso');
const { verificarPass, generarToken, hashPass } = require('@damianegreco/hashpass');
const { TOKEN_SECRET } = process.env;

function iniciarSesion(nombreUsuario, password) {
  return loginAcceso.buscarPorNombreUsuario(nombreUsuario)
    .then(usuario => {
      if (!usuario) {
        throw { codigo: 401, mensaje: "Usuario y/o contraseña incorrecto" };
      }
      
      //console.log(hashPass(password));
      
      const passCoinciden = verificarPass(password, usuario.password);

      if (!passCoinciden) {
        throw { codigo: 401, mensaje: "Usuario y/o contraseña incorrecto" };
      }

      const token = generarToken(
        TOKEN_SECRET,
        4,
        { id: usuario.idUsuario, rol: usuario.rol }
      );

      return { token };
    });
}

module.exports = {
  iniciarSesion
};
