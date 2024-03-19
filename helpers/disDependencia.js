import DisDepenencia from "../models/disDependencia.js";

const helpersDisDepenencia = {
    existeDistribucion: async (idDependencia, req) => {
        const idRed = req.req.body.idRed
        if (nombre) {
          const existe = await DisDepenencia.findOne({ 
            idDependencia,
            idRed
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

export default helpersDisDepenencia;
