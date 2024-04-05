import Proveedor from "../models/proveedor.js";

const helpersProveedor = {
  existeId: async (id, req) => {
    const existe = await Proveedor.findById(id);

    if (!existe) {
      throw new Error(`El proveedor no existe ${id}`);
    }

    req.req.ProveedorUpdate = existe;
  },

  existeTelefono: async (telefono, req) => {
    const existe = await Proveedor.findOne({ $text: { $search: telefono } });

    if (existe) {
      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        throw new Error(`Ya existe ese teléfono en la base de datos!!! `);
      } else if (req.req.method === "POST") {
        throw new Error(`Ya existe ese teléfono en la base de datos!!! `);
      }
    }

    req.req.ProveedorUpdate = existe;
  },

  existeCorreo: async (correo, req) => {
    const existe = await Proveedor.findOne({ correo });

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

    req.req.ProveedorUpdate = existe;
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
};
export default helpersProveedor;
