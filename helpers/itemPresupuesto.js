import Item from "../models/dependencia.js";

const helpersItem = {
  existeNombre: async (nombre, req) => {
    if (nombre) {

      const existe = await Item.findOne({ $text: { $search: nombre } });
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

export default helpersItem;