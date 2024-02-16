import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    numero: {type: Number, unique: true},
    //fechaEntrega: {type:Date, require:true },
    idInstructorEncargado: {type:mongoose.Schema.Types.ObjectId,ref:'Usuario', require:true},
    idFicha: {type:mongoose.Schema.Types.ObjectId,ref:'Ficha', require:true},
    total: {type:Number, require:true},
    entregado: {type:Boolean, default: 0},
    estado:{type:Boolean, default:0},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("Pedido", pedidoSchema)