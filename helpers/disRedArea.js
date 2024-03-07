import DisRedArea from "../models/disRedArea.js";

const helpersDisRedArea = {
  existeId: async (id, req) => {
    const disRedArea = await DisRedArea.findById(id);
    if (!disRedArea) {
      throw new Error(`Distribución no encontrada`);
    }

    req.DisRedAreaUpdate = disRedArea;
  },
  existeDistribucion: async (idDisDependenciaRed, req) => {
    const idAreaTematica = req.req.body.idAreaTematica
    if (nombre) {
      const existe = await DisRedArea.findOne({ 
        idDisDependenciaRed,
        idAreaTematica
      });

      if(existe){
        if (req.req.method === "PUT" && req.req.body._id != existe._id) {
          throw new Error(`Ya existe existe esta distribución!!! `);
        } else if (req.req.method === "POST") {
          throw new Error(`Ya existe existe esta distribución!!! `);
        }
      }
    }
  },
};

export default helpersDisRedArea;
