import Entrada from "../models/entrada.js";
const helperEntrada = {
    validarEntradaUnica: async (nombre)=>{
        const existe = await Entrada.findOne({nombre})
        if(existe){
            throw new Error("La entrada ya esta registrada")
        }
    },
    validarEntradaUnicaEditar:async (id, nombre)=>{
        try{
            const entradaExiste = await Entrada.findOne({
                nombre,
                _id: {$ne :id},

            });
            if(entradaExiste){
                throw new Error ("Ya existe una Entrada con este foking nombre ")
            }

            return true;

            xº

        }catch (error) {
            throw error;
        }
    }

}
export default helperEntrada

