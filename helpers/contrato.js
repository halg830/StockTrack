import Contrato from "../models/contrato.js";
import helpersGeneral from "./generales.js";

const helpersContrato = {
  existeNombre: async (nombre, req) => {
    if (nombre) {
      nombre = await helpersGeneral.primeraMayuscula(nombre.toLowerCase())

      const existe = await Contrato.findOne({ nombre });
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
      codigo = await helpersGeneral.primeraMayuscula(codigo.toLowerCase())

      const existe = await Contrato.findOne({codigo} );
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