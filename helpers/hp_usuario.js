import Usuario from "../models/usuario.js";

const helpersUsuario = {
    existeHolderById: async (id, req) => {
        const existe = await Usuario.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }

        req.req.UsuarioUpdate = existe
    },
}
export default helpersUsuario