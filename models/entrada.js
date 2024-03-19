import mongoose from "mongoose";

const entradaSchema = new mongoose.Schema({
    cantidad:{ type:Number, require:true},
    idProducto:{type:mongoose.Schema.Types.ObjectId,ref:'Producto', require:true},
    total: {type: Number},
    estado:{type:Boolean, default:1},
    createAT : {type:Date,default: Date.now }
})

export default mongoose.model("Entrada", entradaSchema)