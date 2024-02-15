import Lote from "../models/lote.js";

const helpersLote = {
  existeId: async (id, req) => {
    const existe = await Lote.findById(id);

    if (!existe) {
      throw new Error(`El id no existe ${id}`);
    }

    req.req.LoteUpdate = existe;
  },

  existeNombre: async (nombre, req) => {
    if (nombre) {
      const existe = await Lote.findOne({ $text: { $search: nombre } });
      if (existe) {
        if (req.req.method === "PUT") {
          throw new Error(
            `Ya existe ese lote en la base de datos!!! ${nombre}`
          );
        } else if (req.req.method === "POST")
          throw new Error(
            `Ya existe ese lote en la base de datos!!! ${nombre}`
          );
      }
    }
  },
};
export default helpersLote;
