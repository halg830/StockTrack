import Ficha from "../models/ficha.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/validar-jwt.js"; 

const httpFicha ={
    getObtenerFichas: async (req, res) => {
        try {
            const ficha = await Ficha.find()
            res.json({ ficha })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getObtenerFichasid: async(req, res)=>{
        const {id} = req.params
        try {
            const ficha = await Ficha.findById({id})
            res.json({ficha})
        } catch (error) {
            res.status(400).json({ error })
        }
    }, 
    getObtenerFichasNumero: async(req,res)=>{
        const {numero} = req.params
        
        try {
            const ficha = await Ficha.find(numero)
            res.json({ficha})
        } catch (error) {
            res.status(400).json({ error })
        }
    }, 
    postAgregarFichas: async(req, res)=>{
        const {}
    }
}



export default httpFicha;
