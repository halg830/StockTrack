import DisDepenencia from "../models/disDependencia.js";

const helpersDisDepenencia = {
    existeDistribucion: async (idDependencia, req) => {
        if (idDependencia) {
          const existe = await DisDepenencia.findOne({ 
            idDependencia,
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
