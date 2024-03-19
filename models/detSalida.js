import mongoose from "mongoose";

const detSalidaSchema = new mongoose.Schema({
    numero: {type: Number, require:true},
    cantidadEntregada:{ type:Number, require:true},
    cantidadPendiente:{ type:Number, require:true},
    idSalida:{type:mongoose.Schema.Types.ObjectId,ref:'Salida', require:true},
    idEntrada:{type:mongoose.Schema.Types.ObjectId,ref:'Entrada', require:true},
    subTotal: {type: Number},
    estado:{type:Boolean, default:1},
    createAT : {type:Date,default: Date.now }
})

export default mongoose.model("DetSalida", detSalidaSchema)