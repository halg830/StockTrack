import ItemPresupuesto from "../models/ItemPresupuesto.js"

const httpItemPresupuesto = {
  // Post
  agregarItem: async(req, res)=>{
    try {
      const {nombre, presupuesto} = req.body
      const itemPresupuesto = new ItemPresupuesto({nombre, presupuesto})

      await itemPresupuesto.save()
      res.json({itemPresupuesto})
    } catch (error) {
      res.status(400).json({error})
    }
  }
};

export default httpItemPresupuesto;
