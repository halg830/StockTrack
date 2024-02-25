import Usuario from "../models/usuario.js";

const helpersUsuario = {
  existeHolderById: async (id, req) => {
    const existe = await Usuario.findById(id);

    if (!existe) {
      throw new Error(`El id no existe ${id}`);
    }

    req.req.UsuarioUpdate = existe;
  },

  desactivarAdmin: async(id, req)=>{
    const rol = req.req.UsuarioUpdate.rol

    if(rol=='admin'){
      const usuarios = await Usuario.find({rol: 'admin'})
      if(usuarios.length<=1) throw new Error(`No se pueden desactivar todos los admin`);
    }

  },

  desactivarLogeado: async(id, req)=>{
    const idLogeado = req.req.usuario._id
    console.log(idLogeado);

    if(idLogeado==id){
      throw new Error(`No puedes desactivarte a ti mismo`)
    }
  },

  existeIdentificacion: async (identificacion, req) => {
    const existe = await Usuario.findOne({
      $text: { $search: identificacion },
    });

    if (existe) {
      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        throw new Error(`Ya existe ese identificacion en la base de datos!!! `);
      } else if (req.req.method === "POST") {
        throw new Error(`Ya existe ese identificacion en la base de datos!!! `);
      }
    }

    req.req.UsuarioUpdate = existe;
  },

  existeTelefono: async (telefono, req) => {
    const existe = await Usuario.findOne({ $text: { $search: telefono } });

    if (existe) {
      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        throw new Error(`Ya existe ese teléfono en la base de datos!!! `);
      } else if (req.req.method === "POST") {
        throw new Error(`Ya existe ese teléfono en la base de datos!!! `);
      }
    }

    req.req.UsuarioUpdate = existe;
  },

  existeCorreo: async (correo, req) => {
    const existe = await Usuario.findOne({ correo });

    if (!existe && req.req.method === "GET") {
      throw new Error(`El correo no se encuentra registrado`);
    }

    if (existe) {
      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        throw new Error(`Ya existe ese correo en la base de datos!!! `);
      } else if (req.req.method === "POST") {
        throw new Error(`Ya existe ese correo en la base de datos!!! `);
      }
    }

    req.req.UsuarioUpdate = existe;
  },

  existeCorreoNewPass: async(correo, req) => {
    const existe = await Usuario.findOne({ correo });

    if (!existe) {
      throw new Error(`El correo no se encuentra registrado`);
    }

    req.req.UsuarioUpdate = existe;
  },

  validarPassword: async (password, req) => {
    const vali = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    if (!vali.test(password)) {
      throw new Error("La contraseña no cumple con los requisitos.");
    }
    return true;
  },

  validarRol: async (rol, req) => {
    const roles = ["admin", "instructor", "bodega"];
    if (!roles.includes(rol.toLowerCase())) {
      throw new Error("Rol no válido");
    }
  },
};
export default helpersUsuario;
