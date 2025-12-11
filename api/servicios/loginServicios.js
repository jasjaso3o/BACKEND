const loginAcceso = require('../acceso/loginAcceso');
const { verificarPass, generarToken, hashPass } = require('@damianegreco/hashpass');
const { TOKEN_SECRET } = process.env;

function iniciarSesion(nombreUsuario, password) {
  return loginAcceso.buscarPorNombreUsuario(nombreUsuario)
    .then(usuario => {
      if (!usuario) {
        throw { codigo: 401, mensaje: "Usuario y/o contraseña incorrecto" };
      }
      
      console.log(hashPass(password));
      
      const passCoinciden = verificarPass(password, usuario.password);

      if (!passCoinciden) {
        throw { codigo: 401, mensaje: "Usuario y/o contraseña incorrecto" };
      }

      const token = generarToken(
        TOKEN_SECRET, //contraseña para firmar
        1, //duracion en horas
        { id: usuario.idUsuario, rol: usuario.rol } //datos a incluir en el token
      );

      console.log('token de autenticacion: ', token);
      

      return { token };
    });
}

module.exports = {
  iniciarSesion
};
