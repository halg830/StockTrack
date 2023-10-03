import DistribucionPresupuesto from "../models/distribucionPresupuesto.js"

const httpDistribucionesPresupuesto = {
  // Post
  agregarDistribucion: async(req, res)=>{
    try {
      const {idLote, idItem, presupuesto} = req.body
      const itemDistribucion = new DistribucionPresupuesto({idLote, idItem, presupuesto})

      await itemDistribucion.save()
      res.json({itemDistribucion})
    } catch (error) {
      res.status(400).json({error})
    }
  }
};

export default httpDistribucionesPresupuesto;
