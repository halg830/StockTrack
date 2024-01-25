import mongoose from "mongoose";

const fichaSchema = new mongoose.Schema({
    codigo: {type:String, require:true},
    nombre: {type:String, require:true},
    nivelFormacion: {type:String, require:true},
    fechaInicio:{type:Date, require:true},
    fechaFin:{type:Date, require:true},
    estado:{type:Boolean, default:1},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("Ficha", fichaSchema)