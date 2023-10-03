import Persona from "../models/persona.js";
import bcryptjs from "bcryptjs"
import  {generarJWT} from "../middlewares/validar-jwt.js";

const httpPersona = {
    registroVendedor: async (req, res) => {
        try {
            const persona = await Persona.find()
            res.json({ persona })
            
        } catch (error) {
            res.status(400).json({error})
        }

    },
}

export default httpPersona;