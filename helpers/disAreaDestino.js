import DisAreaDestino from "../models/disAreaDestino.js";

const helpersDisAreaDestino = {
    existeDistribucion: async (idDisRedArea, req) => {
        const idDestino = req.req.body.idDestino
        if (idDestino && idDisRedArea) {
          const existe = await DisAreaDestino.findOne({ 
            idDisRedArea,
            idDestino
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

export default helpersDisAreaDestino;
