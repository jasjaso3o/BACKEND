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

  //const [resultado] = await registroAcceso.registrarse(usuarioDatos);

  console.log("usuario registrandose",usuarioDatos);

  const [usuarioCreado] = await registroAcceso.registrarse(usuarioDatos);
  const nuevoUsuario = {
    idUsuario: usuarioCreado.insertId,
  }


  const token = generarToken(
    TOKEN_SECRET,
    1,
    { id: nuevoUsuario.idUsuario, rol: "usuario"}
  );

  console.log('token de autenticacion: ', token);

  return {token} ;
  
}

module.exports = {
  registrarse
}