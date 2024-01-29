import mongoose from "mongoose";

const loteSchema = new mongoose.Schema({
    codigo : {type:String, require:true},
    nombre : { type: String, maxlenght: 15, require:true, unique: true},
    descripcion : {type:String, require: true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});

export default mongoose.model("Lote", loteSchema)