import mongoose from "mongoose";

const loteSchema = new mongoose.Schema({
    nombre : { type: String, index:'text', require:true, unique:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});

export default mongoose.model("Lote", loteSchema)