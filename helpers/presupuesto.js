import DistribucionPresupuesto from "../models/disDependenciaRed.js";

const helpersPresupuesto={
  validarPresupuesto: async(presupuesto, res) => {
    if(presupuesto<=0){
      throw new Error("El presupuesto debe ser mayor a 0")
    }
  },
  obtenerDistribucionPresupuestoPorId: async(presupuesto, req) => {
      const distribucion = await DistribucionPresupuesto.find({presupuesto});
      if(distribucion.presupuesto < req.req.body.presupuesto){
        throw new Error("El presupuesto debe ser menor al presupuesto asignado a la distribución")
      }
  
    }
}

export default helpersPresupuesto;