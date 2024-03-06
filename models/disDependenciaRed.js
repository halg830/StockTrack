import mongoose from "mongoose";

const distribucionPresupuestoSchema = new mongoose.Schema({
    presupuesto: { type:Number, require:true},
    presupuestoDisponible: { type:Number, require:true},
    idDependencia: {type:mongoose.Schema.Types.ObjectId,ref:'Dependencia', require:true},
    idRed : {type:mongoose.Schema.Types.ObjectId,ref:'RedConocimiento', require:true},
    year: {type: Date, require: true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});


export default mongoose.model("DistribucionPresupuesto", distribucionPresupuestoSchema)