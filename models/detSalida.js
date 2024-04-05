import mongoose from "mongoose";

const detSalidaSchema = new mongoose.Schema({
    cantidadEntregada:{ type:Number, require:true},
    cantidadPendiente:{ type:Number, require:true},
    idSalida:{type:mongoose.Schema.Types.ObjectId,ref:'Salida', require:true},
    idProducto:{type:mongoose.Schema.Types.ObjectId,ref:'Producto', require:true},
    subTotal: {type: Number},
    estado:{type:Boolean, default:1},
    createAT : {type:Date,default: Date.now }
})

export default mongoose.model("DetSalida", detSalidaSchema)