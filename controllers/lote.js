import Lote from "../models/Lote.js";

const httpLote = {
  // Post
  agregarLote: async(req, res)=>{
    try {
      const {nombre, presupuesto} = req.body
      const lote = new Lote({nombre, presupuesto})

      await lote.save()
      res.json({lote})
    } catch (error) {
      res.status(400).json({error})
    }
  }
};

export default httpLote;
