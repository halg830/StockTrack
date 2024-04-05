import Area from "../models/area.js";

const helpersArea = {
  existeNombre: async (nombre, req) => {
    const existe = await Area.findOne({
      $text: { $search: nombre },
    });

    if (existe) {
      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        throw new Error(`Ya existe ese nombre en la base de datos!!! `);
      } else if (req.req.method === "POST") {
        throw new Error(`Ya existe ese nombre en la base de datos!!! `);
      }
    }

    req.req.AreaUpdate = existe;
  },
};
export default helpersArea;
