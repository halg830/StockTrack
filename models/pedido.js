import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    numero: {type: Number, unique: true},
    fechaEntrega: {type:Date },
    idInstructorEncargado: {type:mongoose.Schema.Types.ObjectId,ref:'Usuario', require:true},
    idDestino: {type:mongoose.Schema.Types.ObjectId,ref:'Destino', require:true},
    total: {type:Number},
    entregado: {type:Boolean, default: 0},
    estado:{type:Boolean, default:0},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("Pedido", pedidoSchema)