import mongoose from "mongoose";

const loteSchema = new mongoose.Schema({
    nombre: { type: String, maxlenght: 15, require:true, unique: true},
    presupuesto: { type:Number, require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});

export default mongoose.model("Lote", loteSchema)