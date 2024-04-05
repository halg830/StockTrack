import conexionRedLote from "../models/conexionRedLote.js";

const helpersConexionRedLote = {
  existeConexion: async (idLote, req) => {
    const { idRed } = req.req.body
    if (idLote && idRed) {
      const existe = await conexionRedLote.findOne({
        idLote, idRed
      });
      if (existe) {
        if (req.req.method === "PUT" && req.req.body._id.toString() !== existe._id.toString()) {
          throw new Error(`Ya existe esta conexion!!!`);
        } else if (req.req.method === "POST") {
          throw new Error(`Ya existe esta conexion!!!`);
        }
      }
    }
  },
  existeCodigo: async (codigo, req) => {
    if (codigo) {

      const existe = await conexionRedLote.findOne({ $text: { $search: codigo } });
      if (existe) {
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