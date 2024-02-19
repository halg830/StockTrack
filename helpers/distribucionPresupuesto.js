import DistribucionPresupuesto from "../models/distribucionPresupuesto.js";

const helpersDisPresupuesto = {
    validarDisPreUnica: async ( idItem, idLote, presupuesto) => {
        try {
            const existe = await DistribucionPresupuesto.find({ 
                idItem: idItem,
                idLote: idLote,
                presupuesto:presupuesto
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
