import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import nodemailer from 'nodemailer';
import { generarJWT } from "../middlewares/validar-jwt.js";

const httpUsuario = {
  //Post registro usuario
  registroUsuario: async (req, res) => {
    try {
      const { nombre, identificacion, correo, telefono, rol, password } =
        req.body;
      const usuario = new Usuario({
        nombre,
        identificacion,
        correo,
        telefono,
        rol,
        password,
      });
      const salt = bcryptjs.genSaltSync();
      usuario.password = bcryptjs.hashSync(password, salt);

      await usuario.save();

      res.json(usuario);
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
          error: "Usuario / Password no son correctos",
        });
      }
      if (usuario.estado === 0) {
        return res.status(400).json({
          error: "Usuario Inactivo",
        });
      }
      const validPassword = bcryptjs.compareSync(password, usuario.password);
      if (!validPassword) {
        return res.status(401).json({
          error: "Password no es correcta",
        });
      }
      const token = await generarJWT(usuario.id);
      res.json({ usuario, token });
    } catch (error) {
      return res.status(500).json({
        error: "Hable con el WebMaster",
      });
    }
  },

  recuperarPassword: async(req,res)=>{
    const {correo} = req.body;

    const usuario = await Usuario.findOne({correo});
    
    if(!usuario) return res.status(404).json({error: 'Usuario no encontrado'})

    const token = await generarJWT(usuario.id);
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.userEmail,
        pass: process.env.password,
      },
    });
  
    // Contenido del correo electrónico
    const mailOptions = {
      from: process.env.userEmail,
      to: correo,
      subject: 'Recuperación de Contraseña',
      text: 'Haz clic en el siguiente enlace para restablecer tu contraseña: http://tu-app.com/reset-password?token=TU_TOKEN',
    };
  
    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al enviar el correo electrónico.' });
      } else {
        console.log('Correo electrónico enviado: ' + info.response);
        res.json({ success: true, message: 'Correo electrónico enviado con éxito.' });
      }
    });
  },
  putCambioPassword: async (req, res) => {
    const { id } = req.params;
    const { password, newPassword } = req.body;

    try {
      const usuario = await Usuario.findById(id);

      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const validPassword = bcryptjs.compareSync(password, usuario.password);

      if (!validPassword) {
        return res
          .status(400)
          .json({ error: "Contraseña actual incorrecta" });
      }

      const salt = bcryptjs.genSaltSync();
      const cryptNewPassword = bcryptjs.hashSync(newPassword, salt);

      usuario.password = cryptNewPassword;
      await usuario.save();

      return res
        .status(200)
        .json({ mensaje: "Contraseña actualizada con éxito" });
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  logOut: async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: "Error al cerrar sesión" });
        }
        res.clearCookie("stockTrackCokkie");
        return res.status(200).json({ mensaje: "Sesión cerrada con éxito" });
      });
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};

export default httpUsuario;
