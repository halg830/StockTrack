import DistribucionPresupuesto from "../models/distribucionPresupuesto.js";

const helpersPresupuesto={
  validarPresupuesto: async(presupuesto, res) => {
    if(presupuesto<=0){
      throw new Error("El presupuesto debe ser mayor a 0")
    }
  },
  obtenerDistribucionPresupuestoPorId: async(presupuesto, req) => {
      const distribucion = await DistribucionPresupuesto.findById(presupuesto);
      if(distribucion.presupuesto < req.req.body.presupuesto){
        throw new Error("El presupuesto debe ser menor al presupuesto asignado a la distribución")
      }
  
    }
}

export default helpersPresupuesto;