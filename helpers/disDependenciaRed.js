import DisDependenciaRed from "../models/disDependenciaRed.js";

const helpersDisDependenciaRed = {
    existeDistribucion: async (idDependencia, req) => {
        const idRed = req.req.body.idRed
        if (idDependencia, idRed) {
          const existe = await DisDependenciaRed.findOne({ 
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

export default helpersDisDependenciaRed;
