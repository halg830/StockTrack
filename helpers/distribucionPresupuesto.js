import DistribucionPresupuesto from "../models/distribucionPresupuesto.js";

const helpersDisPresupuesto = {
    validarDisPreUnica: async ( idItem, req) => {
        try {
            const idLote = req.req.body.idLote;
            const presupuesto = req.req.body.presupuesto;

            const existe = await DistribucionPresupuesto.findOne({ 
                idItem: idItem,
                idLote: idLote,
                presupuesto: presupuesto
            });
        
            if (existe) {
                throw new Error("Esta distribucion ya existe");
            } 
        } catch (error) {
            throw new Error(error)
        } 
    },
};

export default helpersDisPresupuesto;
