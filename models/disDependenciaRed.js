import mongoose from "mongoose";

const disDependenciaRedSchema = new mongoose.Schema({
    presupuestoAsignado: { type:Number, require:true},
    presupuestoDisponible: { type:Number, require:true},
    idDisDependencia: {type:mongoose.Schema.Types.ObjectId,ref:'DisDependencia', require:true},
    idRed : {type:mongoose.Schema.Types.ObjectId,ref:'RedConocimiento', require:true},
    year: {type: Date, require: true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});


export default mongoose.model("DisDependenciaRed", disDependenciaRedSchema)