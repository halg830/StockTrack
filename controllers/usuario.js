import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/validar-jwt.js";

const httpUsuario = {
  //Post registro usuario
  registroUsuario: async (req, res) => {
    try {
      const { nombre,identificacion,correo,telefono,rol,password } = req.body;
      const usuario = new Usuario({nombre,identificacion,correo,telefono,rol,password});
      const salt = bcryptjs.genSaltSync();
      usuario.password = bcryptjs.hashSync(password, salt);

      await usuario.save();

      res.json({ usuario });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  login: async (req, res) => {
    const { identificacion, password } = req.body;

    try {
      const usuario = await Usuario.findOne({ identificacion });
      console.log("a", usuario);

      if (!usuario) {
        return res.status(400).json({
          msg: "Usuario / Password no son correctos",
        });
      }
      /* if (usuario.estado === 0) {
                return res.status(400).json({
                    msg: "Usuario Inactivo"
                })
            } */
      const validPassword = bcryptjs.compareSync(
        password,
        usuario.password
      );
      if (!validPassword) {
        return res.status(401).json({
          msg: "Password no es correcta",
        });
      }
      const token = await generarJWT(usuario.id);
      res.json({usuario,token,});
    } catch (error) {
      return res.status(500).json({
        msg: "Hable con el WebMaster",
      });
    }
  },
  putCambioPassword: async (req, res) => {
    const { id } = req.params;
    const { password, newPassword } = req.body;
  
    try {
      const usuario = await Usuario.findById(id);
  
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      const validPassword = bcryptjs.compareSync(password, usuario.password);
  
      if (!validPassword) {
        return res.status(400).json({ mensaje: 'Contraseña actual incorrecta' });
      }
  
      const salt = bcryptjs.genSaltSync();
      const cryptNewPassword = bcryptjs.hashSync(newPassword, salt);
  
      usuario.password = cryptNewPassword;
      await usuario.save();
  
      return res.status(200).json({ mensaje: 'Contraseña actualizada con éxito' });
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },
  logOut: async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ mensaje: 'Error al cerrar sesión' });
        }
        res.clearCookie('stockTrackCokkie');
        return res.status(200).json({ mensaje: 'Sesión cerrada con éxito' });
      });
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },
};



export default httpUsuario;
