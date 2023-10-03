import mongoose from "mongoose";

const detallePedidoSchema = new mongoose.Schema({
    cantidad:{ type:Number, require:true},
    id_pedido:{type:String, require:true},
    id_producto:{type:String, require:true},
    estado:{type:Boolean, default:1},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("DetallePedido", detallePedidoSchema)