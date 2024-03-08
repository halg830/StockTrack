import Contrato from "../models/contrato.js";

const helpersContrato = {
  existeNombre: async (nombre, req) => {
    if (nombre) {

      const existe = await Contrato.findOne({ $text: { $search: nombre } });
      if(existe){
        if (req.req.method === "PUT" && req.req.body._id != existe._id) {
          throw new Error(`Ya existe ese nombre en la base de datos!!! `);
        } else if (req.req.method === "POST") {
          throw new Error(`Ya existe ese nombre en la base de datos!!! `);
        }
      }
    }
  },
  existeCodigo: async (codigo, req) => {
    if (codigo) {

      const existe = await Contrato.findOne({ $text: { $search: codigo } });
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

export default helpersContrato;