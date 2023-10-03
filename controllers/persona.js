import Persona from "../models/persona.js";
import bcryptjs from "bcryptjs"
import  {generarJWT} from "../middlewares/validar-jwt.js";

const httpPersona = {
    registroVendedor: async (req, res) => {
        try {
            const { nombre, identificacion, nombreUsuario, correo, telefono, codigoRol,contraseña} = req.body
            const persona = new Persona({  nombre, identificacion, nombreUsuario, correo, telefono, codigoRol, contraseña})
            const salt = bcryptjs.genSaltSync();
            persona.contraseña = bcryptjs.hashSync(contraseña, salt)

            await persona.save()

            res.json({ persona })
        } catch (error) {
            res.status(400).json({ error })
        }

    },
}

export default httpPersona;