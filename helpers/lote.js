import Lote from "../models/lote.js";

const helpersLote = {
    existeNombre: async (nombre, req) => {
        if (nombre) {
    
          const existe = await Lote.findOne({ $text: { $search: nombre } });
          if (existe) {
            if (req.req.method === "PUT") {
              throw new Error(
                `Ya existe ese lote en la base de datos!!! ${nombre}`
              );
            } else if (req.req.method === "POST")
              throw new Error(
                `Ya existe ese lote en la base de datos!!! ${nombre}`
              );
          }
        }
      },
}
export default helpersLote