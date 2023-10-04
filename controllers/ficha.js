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
    getFichasPorArea:async(req,res)=>{
        try {
            const idArea = req.params
            const fichasPorArea = await Ficha.find({ idArea }).populate("idArea");
            res.json(fichasPorArea);
          } catch (error) {
            res.status(500).json({ error: 'Error al obtener las fichas por área' });
          }
    },
    getFichasEstado: async (req,res)=>{
        try {
            const estado = req.params;
        
            const fichasPorEstado = await Ficha.find({ estado });
        
            res.json(fichasPorEstado);
          } catch (error) {
            res.status(500).json({ error: 'Error al obtener las fichas por estado' });
          }
    },

    postAgregarFichas: async(req, res)=>{
        try {
            const {codigo, nombre, nivelFormacion, fechaInicio, fechaFin, idArea} = req.body
            const ficha = new Ficha({ codigo, nombre, nivelFormacion, fechaInicio, fechaFin, idArea })
            await ficha.save()

            res.json({ ficha })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    
    putEditarFicha:async (req,res)=>{
        try {
            const { id } = req.params
            const { codigo, nombre, nivelFormacion, fechaInicio, fechaFin, idArea } = req.body
            const ficha = await
                Ficha.findByIdAndUpdate(id, { codigo, nombre, nivelFormacion, fechaInicio, fechaFin, idArea}, { new: true });
            res.json({ficha})
        } catch (error) {
            res.status(400).json({error})
        }
    },

    deleteFicha: async (req,res) => {
        try {
            const { id } = req.params
            const ficha = await Ficha.findByIdAndDelete(id)
            res.json(ficha + `Ficha eliminado`)
        } catch (error) {
            res.status(400).json({error})
        }
    },

    putFichaInactivar: async (req,res)=>{
        try {
            const {id} = req.params
            const ficha =await Ficha.findByIdAndUpdate(id,{estado:0},{new:true})
            res.json({ficha})
        } catch (error) {
            res.status(400).json({error})
            
        }
    }
}



export default httpFicha;
