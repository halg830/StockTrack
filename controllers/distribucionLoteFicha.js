import Asignacion from "../models/distribucionLoteFicha.js";


const httpDistribucionLoteFicha = {
    //Post
    asignacionPresupuesto: async (req, res) => {
        try {
            const {
              presupuesto,
              id_distribucion_presupuesto,
              id_ficha,
            } = req.body;
            const asignacion = new Asignacion({
                presupuesto,
                id_distribucion_presupuesto,
                id_ficha,
            });
            await asignacion.save();
      
            res.json({ asignacion });
          } catch (error) {
            res.status(400).json({ error });
          }
        },


        //Get

        //Put




}

export default httpDistribucionLoteFicha

