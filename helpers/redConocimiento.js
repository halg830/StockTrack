import RedConocimiento from "../models/redConocimineto.js";

const helpersRedConocimiento = {
  existeId: async (id, req) => {
    const existe = await RedConocimiento.findById(id);

    if (!existe) {
      throw new Error(`El id no existe ${id}`);
    }

    req.req.LoteUpdate = existe;
  },

  existeNombre: async (nombre, req) => {
    if (nombre) {
      const existe = await RedConocimiento.findOne({ $text: { $search: nombre } });

      if(existe){
        if (req.req.method === "PUT" && req.req.body._id != existe._id) {
          throw new Error(`Ya existe ese nombre en la base de datos!!! `);
        } else if (req.req.method === "POST") {
          throw new Error(`Ya existe ese nombre en la base de datos!!! `);
        }
      }
    }
  },
};
export default helpersRedConocimiento;
