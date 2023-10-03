import Persona from "../models/persona.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/validar-jwt.js";

const httpPersona = {
  //Post registro persona
  registroVendedor: async (req, res) => {
    try {
      const {
        nombre,
        identificacion,
        nombreUsuario,
        correo,
        telefono,
        codigoRol,
        contraseña,
      } = req.body;
      const persona = new Persona({
        nombre,
        identificacion,
        nombreUsuario,
        correo,
        telefono,
        codigoRol,
        contraseña,
      });
      const salt = bcryptjs.genSaltSync();
      persona.contraseña = bcryptjs.hashSync(contraseña, salt);

      await persona.save();

      res.json({ persona });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  login: async (req, res) => {
    const { nombreUsuario, contraseña } = req.body;

    try {
      const persona = await Persona.findOne({ nombreUsuario });
      console.log("a", persona);

      if (!persona) {
        return res.status(400).json({
          msg: "Usuario / Password no son correctos",
        });
      }

      /* if (persona.estado === 0) {
                return res.status(400).json({
                    msg: "Usuario Inactivo"
                })
            } */

      const validPassword = bcryptjs.compareSync(
        contraseña,
        persona.contraseña
      );
      if (!validPassword) {
        return res.status(401).json({
          msg: "Password no es correcta",
        });
      }

      const token = await generarJWT(persona.id);

      res.json({
        persona,
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
