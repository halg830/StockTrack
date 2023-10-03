import mongoose from "mongoose";

const detallePedidoSchema = new mongoose.Schema({
    cantidad:{ type:Number, require:true},
    id_pedido:{type:mongoose.Schema.Types.ObjectId,ref:'Pedido', require:true},
    id_producto:{type:mongoose.Schema.Types.ObjectId,ref:'Producto', require:true},
    estado:{type:Boolean, default:1},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("DetallePedido", detallePedidoSchema)