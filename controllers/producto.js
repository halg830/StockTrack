import Producto from "../models/producto.js";

const httpProducto ={
    getObtenerProducto: async (req, res) => {
        try {
            const producto = await producto.find()
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
    }
    
}



export default httpProducto;
