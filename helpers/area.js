import Area from "../models/area.js";

const helpersArea = {
  existeNombre: async (nombre, req) => {
    if (nombre) {

      const existe = await Area.findOne({ $text: { $search: nombre } });
      if (existe) {
        if (req.req.method === "PUT") {
          throw new Error(
            `Ya existe esa area en la base de datos!!! ${nombre}`
          );
        } else if (req.req.method === "POST")
          throw new Error(
            `Ya existe esa area en la base de datos!!! ${nombre}`
          );
      }
    }
  },
};

export default helpersArea;