import Proceso from "../models/proceso.js";

const helpersProceso = {
  existeId: async (id, req) => {
    if (id) {
      const existe = await Proceso.findById(id);

      if (existe) {
        if (req.req.method === "PUT" && req.req.body._id != existe._id) {
          throw new Error(`Ya existe existe este proceso!!! `);
        } else if (req.req.method === "POST") {
          throw new Error(`Ya existe existe este proceso!!! `);
        }
      }
    }
  },
};

export default helpersProceso;
