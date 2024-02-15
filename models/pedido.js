import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    fechaCreacion: {type:Date, require:true },
    //fechaEntrega: {type:Date, require:true },
    idInstructorEncargado: {type:mongoose.Schema.Types.ObjectId,ref:'Usuario', require:true},
    total: {type:Number, require:true},
    entregado: {type:Boolean, default: 0},
    estado:{type:Boolean, default:0},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("Pedido", pedidoSchema)