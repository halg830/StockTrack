import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/validar-jwt.js";

const httpPersona = {
  //Post registro usuario
  registroVendedor: async (req, res) => {
    try {
      const {
        nombre,
        identificacion,
        correo,
        telefono,
        rol,
        contraseña,
      } = req.body;
      const usuario = new Usuario({
        nombre,
        identificacion,
        correo,
        telefono,
        rol,
        contraseña,
      });
      const salt = bcryptjs.genSaltSync();
      usuario.contraseña = bcryptjs.hashSync(contraseña, salt);

      await usuario.save();

      res.json({ usuario });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  login: async (req, res) => {
    const { identificacion, contraseña } = req.body;

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
        contraseña,
        usuario.contraseña
      );
      if (!validPassword) {
        return res.status(401).json({
          msg: "Password no es correcta",
        });
      }

      const token = await generarJWT(usuario.id);

      res.json({
        usuario,
        token,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Hable con el WebMaster",
      });
    }
  },
};

export default httpPersona;
