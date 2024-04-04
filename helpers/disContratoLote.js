import DisContratoLote from "../models/disContratoLote.js";

const helpersDisContratoLote = {
    existeDistribucion: async (idDependencia, req) => {
        const idLote = req.req.body.idLote
        if (nombre) {
          const existe = await DisContratoLote.findOne({ 
            idDependencia,
            idLote
          });
    
          if(existe){
            if (req.req.method === "PUT" && req.req.body._id != existe._id) {
              throw new Error(`Ya tiene asignado presupuesto este lote!!! `);
            } else if (req.req.method === "POST") {
              throw new Error(`Ya tiene asignado presupuesto este lote!!! `);
            }
          }
        }
      },
};

export default helpersDisContratoLote;
