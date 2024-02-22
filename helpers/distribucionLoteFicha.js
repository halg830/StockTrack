import DistLoteFicha from "../models/distribucionLoteFicha.js";

const helpersDistLoteFicha = {
  existeId: async (id, req) => {
    const distLoteFicha = await DistLoteFicha.findById(id);
    if (!distLoteFicha) {
      throw new Error(`Distribución no encontrada`);
    }

    req.DistLoteFichaUpdate = distLoteFicha;
  },
  existeDistribucion: async (idFicha, req) =>{
    try {
      const idDistribucionPresupuesto = req.req.body.idDistribucionPresupuesto;

      const existe = await DistLoteFicha.findOne({ 
          idDistribucionPresupuesto: idDistribucionPresupuesto,
          idFicha: idFicha,
      });
  
      if (existe) {
          throw new Error("Esta distribucion ya existe");
      } 
  } catch (error) {
      throw new Error(error)
  } 
  }
};

export default helpersDistLoteFicha;
