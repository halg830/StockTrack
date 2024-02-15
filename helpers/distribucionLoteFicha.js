import DistLoteFicha from "../models/distribucionLoteFicha.js";

const helpersDistLoteFicha = {
  existeId: async (id, req) => {
    const distLoteFicha = await DistLoteFicha.findById(id);
    if (!distLoteFicha) {
      throw new Error(`Distribución no encontrada`);
    }

    req.DistLoteFichaUpdate = distLoteFicha;
  },
};

export default helpersDistLoteFicha;
