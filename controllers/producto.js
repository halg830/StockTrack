import Producto from "../models/producto.js";

const httpProducto ={
    getObtenerProducto: async (req, res) => {
        try {
            const producto = await Producto.find()
            res.json({ producto })
        } catch (error) {
            res.status(400).json({ error })
        }
    },

    postAgregarProducto: async(req, res)=>{
        try {
            const {codigo, nombre, descripcion, unidadMedida, precioUnitario, iva, tipoProducto} = req.body
            const producto = new Producto({ codigo, nombre, descripcion, unidadMedida, precioUnitario, iva, tipoProducto })
            await producto.save()

            res.json({ producto })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    
    putEditarProducto:async (req,res)=>{
        try {
            const { id } = req.params
            const { codigo, nombre, descripcion, unidadMedida, precioUnitario, iva, tipoProducto} = req.body
            const producto = await
                Producto.findByIdAndUpdate(id, { codigo, nombre, descripcion, unidadMedida, precioUnitario, iva, tipoProducto}, { new: true });
            res.json({producto})
        } catch (error) {
            res.status(400).json({error})
        }
    },

    putProductoInactivar: async (req,res)=>{
        try {
            const {id} = req.params
            const producto =await Producto.findByIdAndUpdate(id,{estado:0},{new:true})
            res.json({producto})
        } catch (error) {
            res.status(400).json({error})
        }
    },

    getObtenerProductoPorFechas: async(req, res)=>{
        try {
            const { fechaInicio, fechaFin } = req.query;
        
            if (!fechaInicio || !fechaFin) {
                return res.status(400).json({ error: 'Debes proporcionar fechas de inicio y fin.' });
            }
        
            const producto = await Producto.find({
                fecha_agg: {
                    $gte: new Date(fechaInicio),
                    $lte: new Date(fechaFin),
                },
              }); 
              res.json({producto})
            } catch (error) {
                res.status(400).json({ error })
            }
    }
}



export default httpProducto;
