import Usuario from "../models/usuario.js";

const helpersUsuario = {
    existeHolderById: async (id, req) => {
        const existe = await Usuario.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }

        req.req.UsuarioUpdate = existe
    },
    validarPassword: async(password,req)=>{
        const vali = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
        if (!vali.test(password)) {
            throw new Error("La contraseña no cumple con los requisitos.");
        }
            return true;   
    }
}
export default helpersUsuario