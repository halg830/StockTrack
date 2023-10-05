import DetallePedido from "../models/detallePedido.js";

const httpDetallePedido ={
    getDetallesPedidos: async(req, res)=>{
        try {
            const detallePedido = await DetallePedido.find()
            .populate('idPedido', 'fechaCreacion subtotal')
            .populate('idProducto', 'nombre descripcion precioUnitario')
            res.json({ detallePedido })
        } catch (error) {
            res.status(400).json({ error })
        }
    }, 
    getDetallePedidoById:  async(req,res)=>{
        try {
            const {id} = req.params
            const detallePedido = await DetallePedido.findById({id})
            .populate('idPedido', 'fechaCreacion subtotal')
            .populate('idProducto', 'nombre descripcion precioUnitario')
            res.json({detallePedido})
        } catch (error) {
            res.status(400).json({error})
        }
    },
    postDetallePedido: async(req,res)=>{
        try {
            const {cantidad, idPedido, idProducto} = req.body
            const detallePedido = new DetallePedido({cantidad, idPedido, idProducto}) 
            await detallePedido.save()
        } catch (error) {
            res.status(400).json({error})
        }
    },
    putEditarDetallePedido: async(req,res)=>{
        try {
            const {id} = req.params
            const {cantidad, idPedido, idProducto} = req.body
            const detallePedido = await
                DetallePedido.findByIdAndUpdate(id,  {cantidad, idPedido, idProducto}, { new: true });
            res.json({detallePedido})
        } catch (error) {
            res.status(400).json({error})
            
        }
    },
    deleteDetallePedido: async(req,res)=>{
        try {
            const { id } = req.params
            const detallePedido = await DetallePedido.findByIdAndDelete(id)
            res.json(detallePedido + `Detalle pedido eliminado`)
        } catch (error) {
            res.status(400).json({error})
        }
    },
    putDetallePedidoInactivar: async (req,res)=>{
        try {
            const {id} = req.params
            const detallePedido =await DetallePedido.findByIdAndUpdate(id,{estado:0},{new:true})
            res.json({detallePedido})
        } catch (error) {
            res.status(400).json({error})
            
        }
    }
}
export default httpDetallePedido;

