import Lote from "../models/lote.js.js";

const helpersLote = {
    validarLoteUnico: async(codigo, )=>{
        
        const existe = await Lote.findOne({codigo})
    
        if(existe){
            throw new Error("La lote ya esta registrado")
        }
       
    }, 
    validarLoteUnicoEditar: async (id, codigo) => {
        try {
            const loteExiste = await Lote.findOne({
                codigo,
                _id: { $ne: id },
            });

            if (loteExiste) {
                throw new Error("Ya existe un Lote con este codigo");
            }

            return true;
        } catch (error) {
            throw error;
        }
    },
}
export default helpersLote