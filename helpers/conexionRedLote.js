import conexionRedLote from "../models/conexionRedLote.js";

const helpersConexionRedLote = {
    existeRed: async (idRed, req) => {
        if (idRed) {
          const existe = await conexionRedLote.findOne({
            idRed: idRed, 
          });
          if (existe) {
            if (req.req.method === "PUT" && req.req.body._id.toString() !== existe._id.toString()) {
              throw new Error(`Ya existe esta red!!!`);
            } else if (req.req.method === "POST") {
              throw new Error(`Ya existe esta red!!!`);
            }
          }
        }
      },
  existeCodigo: async (codigo, req) => {
    if (codigo) {

      const existe = await conexionRedLote.findOne({ $text: { $search: codigo } });
      if(existe){
        if (req.req.method === "PUT" && req.req.body._id != existe._id) {
          throw new Error(`Ya existe ese codigo en la base de datos!!! `);
        } else if (req.req.method === "POST") {
          throw new Error(`Ya existe ese codigo en la base de datos!!! `);
        }
      }
    }
  },
};

export default helpersConexionRedLote;