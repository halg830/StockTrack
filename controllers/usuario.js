import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import { generarJWT } from "../middlewares/validar-jwt.js";
import helpersGeneral from "../helpers/generales.js";

const httpUsuario = {
  //Get
  getAll: async (req, res) => {
    try {
      const usuario = await Usuario.find();
      res.json(usuario);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  //Post registro usuario
  registroUsuario: async (req, res) => {
    try {
      const {
        nombre,
        apellido,
        identificacion,
        correo,
        telefono,
        rol,
        password,
      } = req.body;

      const mayusNombre = await helpersGeneral.mayusAllPalabras(nombre.trim());
      const mayusApellido = await helpersGeneral.mayusAllPalabras(
        apellido.trim()
      );
      const usuario = new Usuario({
        nombre: mayusNombre,
        apellido: mayusApellido,
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

  recuperarPassword: async (req, res) => {
    const { correo } = req.body;

    const usuario = await Usuario.findOne({ correo });

    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    const token = await generarJWT(usuario.id);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.userEmail,
        pass: process.env.password,
      },
    });

    const mailOptions = {
      from: process.env.userEmail,
      to: correo,
      subject: "Recuperación de Contraseña",
      text:
        "Haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:5173/#/recuperar-password?token=" +
        token,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          msg: "Error al enviar el correo electrónico.",
        });
      } else {
        console.log("Correo electrónico enviado: " + info.response);
        res.json({
          success: true,
          msg: "Correo electrónico enviado con éxito.",
        });
      }
    });
  },

  //Put
  putCambioPassword: async (req, res) => {
    const { id } = req.params;
    const { password, newPassword } = req.body;

    try {
      const usuario = await Usuario.findById(id);

      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const passAnterior = usuario.password;

      const validPassword = bcryptjs.compareSync(
        String(password),
        String(passAnterior)
      );

      if (!validPassword) {
        return res.status(401).json({ error: "Contraseña actual incorrecta" });
      }

      const salt = bcryptjs.genSaltSync();
      const cryptNewPassword = bcryptjs.hashSync(newPassword, salt);

      await Usuario.findByIdAndUpdate(
        usuario.id,
        { password: cryptNewPassword },
        { new: true }
      );

      return res.status(200).json({ msg: "Contraseña actualizada con éxito" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msgError: "Error interno del servidor", error });
    }
  },

  editarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, apellido, identificacion, correo, telefono, rol } =
        req.body;

      const mayusNombre = await helpersGeneral.mayusAllPalabras(nombre.trim());
      const mayusApellido = await helpersGeneral.mayusAllPalabras(
        apellido.trim()
      );

      const usuario = await Usuario.findByIdAndUpdate(
        id,
        {
          nombre: mayusNombre,
          apellido: mayusApellido,
          identificacion,
          correo,
          telefono,
          rol,
        },
        { new: true }
      );

      res.json(usuario);
    } catch (error) {
      res.status(400).json({ error });
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
