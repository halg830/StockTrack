import mongoose from "mongoose";

const destinoSchema = new mongoose.Schema({
    codigo: {type:String, require:true, unique:true},
    nombre: {type:String, require:true},
    abreviatura: {type: String},
    nivelFormacion: {type:String, require:true},
    fechaInicio:{type:Date, require:true},
    fechaFin:{type:Date, require:true},
    estado:{type:Boolean, default:1},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("Destino", destinoSchema)