import Area from "../models/area.js";

const helpersArea = {
    validarAreaUnica: async(nombre, )=>{
        
        const existe = await Area.findOne({nombre})
    
        if(existe){
            throw new Error("La area ya esta registrada")
        }
       
    }, 
    validarAreaUnicaEditar: async (id, nombre) => {
        try {
            const areaExiste = await Area.findOne({
                nombre,
                _id: { $ne: id },
            });

            if (areaExiste) {
                throw new Error("Ya existe un area con este nombre");
            }

            return true;
        } catch (error) {
            throw error;
        }
    },
}
export default helpersArea
