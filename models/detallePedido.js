import mongoose from "mongoose";

const detallePedidoSchema = new mongoose.Schema({
    cantidad:{ type:Number, require:true},
    idPedido:{type:mongoose.Schema.Types.ObjectId,ref:'Pedido', require:true},
    idProducto:{type:mongoose.Schema.Types.ObjectId,ref:'Producto', require:true},
    estado:{type:Boolean, default:1},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("DetallePedido", detallePedidoSchema)