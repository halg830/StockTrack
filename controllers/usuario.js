import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import { generarJWT } from "../middlewares/validar-jwt.js";
import helpersGeneral from "../helpers/generales.js";

let codigoEnviado = {};

function generarNumeroAleatorio() {
  let numeroAleatorio = Math.floor(Math.random() * 1000000);
  let numero = numeroAleatorio.toString().padStart(6, "0");
  let fechaCreacion = new Date();

  codigoEnviado = { codigo: numero, fechaCreacion };

  return numero;
}

const httpUsuario = {
  //Get
  getAll: async (req, res) => {
    try {
      const usuario = await Usuario.find();
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getByRol: async (req, res) => {
    try {
      const { rol } = req.params;
      const usuarios = await Usuario.find({ rol });

      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getByCorreo: async (req, res) => {
    try {
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  codigoRecuperar: async (req, res) => {
    try {
      const { correo } = req.params;

      const codigo = generarNumeroAleatorio();

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
        text: "Tu código para restablecer tu contraseña es: " + codigo,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).json({
            success: false,
            error: "Error al enviar el correo electrónico.",
          });
        } else {
          console.log("Correo electrónico enviado: " + info.response);
          res.json({
            success: true,
            msg: "Correo electrónico enviado con éxito.",
          });
        }
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  confirmarCodigo: async (req, res) => {
    try {
      const { codigo } = req.params;

      if (!codigoEnviado) {
        return res.status(400).json({ error: "Código no generado" });
      }

      const { codigo: codigoGuardado, fechaCreacion } = codigoEnviado;
      const tiempoExpiracion = 30; // Tiempo de expiración en minutos

      const tiempoActual = new Date();
      const tiempoDiferencia = tiempoActual - new Date(fechaCreacion);
      const minutosDiferencia = tiempoDiferencia / (1000 * 60);

      if (minutosDiferencia > tiempoExpiracion) {
        return res.status(400).json({ error: "El código ha expirado" });
      }

      if (codigo === codigoGuardado) {
        return res.json({ msg: "Código correcto" });
      }

      return res.status(400).json({ error: "Código incorrecto" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Error, hable con el WebMaster",
      });
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
        rol: rol.toLowerCase(),
        password,
      });
      const salt = bcryptjs.genSaltSync();
      usuario.password = bcryptjs.hashSync(password, salt);

      await usuario.save();

      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error });
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
      if (usuario.estado == false) {
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

  //Put
  putCambioPassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { password, newPassword } = req.body;
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

  nuevaPassword: async (req, res) => {
    try {
      const { codigo, password } = req.body;

      const { codigo: codigoGuardado, fechaCreacion } = codigoEnviado;
      const tiempoExpiracion = 30; // Tiempo de expiración en minutos

      const tiempoActual = new Date();
      const tiempoDiferencia = tiempoActual - new Date(fechaCreacion);
      const minutosDiferencia = tiempoDiferencia / (1000 * 60);

      if (minutosDiferencia > tiempoExpiracion) {
        return res.status(400).json({ error: "El código ha expirado" });
      }

      if (codigo === codigoGuardado) {
        codigoEnviado = {};

        const usuario = req.UsuarioUpdate;

        const salt = bcryptjs.genSaltSync();
        const newPassword = bcryptjs.hashSync(password, salt);

        await Usuario.findByIdAndUpdate(
          usuario.id,
          { password: newPassword },
          { new: true }
        );

        return res
          .status(200)
          .json({ msg: "Contraseña actualizada con éxito" });
      }

      return res.status(400).json({ error: "Código incorrecto" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Error, hable con el WebMaster",
      });
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
          rol: rol.toLowerCase(),
        },
        { new: true }
      );

      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpUsuario;
