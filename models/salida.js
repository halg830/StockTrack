import mongoose from "mongoose";

const salidaSchema = new mongoose.Schema({
    numero: {type: Number, unique: true},
    fechaEntrega: {type:Date, require:true },
    idBodeguero: {type:mongoose.Schema.Types.ObjectId,ref:'Usuario', require:true},
    idPedido: {type:mongoose.Schema.Types.ObjectId,ref:'Pedido', require:true},
    total: {type:Number},
    entregado: {type:Boolean, default: 0},
    estado:{type:Boolean, default:0},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("Salida", salidaSchema)