import Producto from "../models/producto.js";

const helpersProducto = {
  existeId: async (id, req) => {
    const existe = await Producto.findById(id);

    if (!existe) {
      throw new Error(`El producto no existe ${id}`);
    }

    req.req.ProductoUpdate = existe;
  },

  precioValido: async (precio) => {
    if (precio <= 0) {
      throw new Error("Precio no válido");
    }
  },

  existeCodigo: async (codigo, req) => {
    const existe = await Producto.findOne({ $text: { $search: codigo } });

    if (existe) {
      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        throw new Error(`Ya existe ese codigo en la base de datos!!! `);
      } else if (req.req.method === "POST") {
        throw new Error(`Ya existe ese codigo en la base de datos!!! `);
      }
    }

    req.req.ProductoUpdate = existe;
  },
};

export default helpersProducto;
