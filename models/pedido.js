import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    fechaCreacion: {type:Date, require:true },
    fechaEntrega: {type:Date, require:true },
    idDistribucionLoteFicha: {type:mongoose.Schema.Types.ObjectId,ref:'DistribucionLoteFicha', require:true},
    idInstructorEncargado: {type:mongoose.Schema.Types.ObjectId,ref:'Usuario', require:true},
    subtotal: {type:Number, require:true},
    estado:{type:Boolean, default:1},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("Pedido", pedidoSchema)