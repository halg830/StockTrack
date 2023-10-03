import mongoose from "mongoose";

const fichaSchema = new mongoose.Schema({
    codigo: {type:Number, require:true},
    nombre: {type:String, require:true},
    nivel_formacio: {type:String, require:true},
    fecha_inicio:{type:Date, require:true},
    fecha_fin:{type:String, require:true},
    estado:{type:Boolean, default:1},
    id_area:{type:String, require:true},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("Ficha", fichaSchema)