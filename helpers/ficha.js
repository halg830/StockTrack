import Ficha from "../models/ficha";

const helpersFicha = {
    validarFechas: async (fechaInicio, req) => {
        const fechaActual = new Date();
        const fechaFin = req.req.body.fechaFin

        if (fechaInicio <= fechaActual) {
            throw new Error('La fecha de inicio debe ser mayor que la fecha actual');
        }
        if (fechaFin <= fechaInicio) {
            throw new Error('La fecha de fin debe ser mayor a la de inicio' );
        }
    },
    validarFichaUnica: async(codigo, )=>{
        
        const existe = await Ficha.findOne({codigo})
    
        if(existe){
            throw new Error("La ficha ya esta registrada")
        }
       
    }, 
    validarFichaUnicaEditar: async (id, codigo) => {
        try {
            const fichaExiste = await Ficha.findOne({
                codigo,
                _id: { $ne: id },
            });

            if (fichaExiste) {
                throw new Error("Ya existe una ficha con este codigo");
            }

            return true;
        } catch (error) {
            throw error;
        }
    },
}
export default helpersFicha