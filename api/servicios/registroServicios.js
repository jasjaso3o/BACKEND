const registroAcceso = require('../acceso/registroAcceso');
const { TOKEN_SECRET } = process.env;
const { hashPass, generarToken } = require('@damianegreco/hashpass');

async function registrarse(usuarioDatos) {

  const usuarioExiste = await registroAcceso.duplicadosNombreUsuario(usuarioDatos.nombreUsuario);
  if (usuarioExiste) {
    throw { status: 409, mensaje: 'Nombre de usuario ya en uso, intenta con otro' };
  }

  const emailExiste = await registroAcceso.duplicadosEmail(usuarioDatos.email);
  if (emailExiste) {
    throw { status: 422, mensaje: 'El email ya está registrado, intenta con otro' };
  }

  const passwordHasheada = hashPass(usuarioDatos.password);
  
  usuarioDatos.password = passwordHasheada;
  console.log(usuarioDatos);

  //const [usuarioCreado] = await registroAcceso.registrarse(usuarioDatos);

  const token = generarToken(
    TOKEN_SECRET,
    1,
    { id: usuarioDatos.idUsuario, rol: usuarioDatos.rol}
  );
  return { token };
}

module.exports = {
  registrarse
}