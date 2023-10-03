import Persona from "../models/persona.js";
import bcryptjs from "bcryptjs"
import  {generarJWT} from "../middlewares/validar-jwt.js";
import { log } from "console";

const httpPersona = {
  login: async (req, res) => {
    const { usuario, contraseña } = req.body;

    try {
        const persona = await Persona.findOne({ usuario })
        console.log(persona);
        
        if (!persona) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos"
            })
        }

        /* if (persona.estado === 0) {
            return res.status(400).json({
                msg: "Usuario Inactivo"
            })
        } */

        const validPassword = bcryptjs.compareSync(contraseña, persona.contraseña);
        if (!validPassword) {
            return res.status(401).json({
                msg: "Password no es correcta"
            })
        } 

        const token = await generarJWT(persona.id);

        res.json({
            persona,
            token
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Hable con el WebMaster"
        })
    }
},
}

export default httpPersona;