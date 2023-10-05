import mongoose from "mongoose";

const distribucionPresupuestoSchema = new mongoose.Schema({
    presupuesto: { type:Number, require:true},
    idLote: {type:mongoose.Schema.Types.ObjectId,ref:'Lote', require:true},
    idItem : {type:mongoose.Schema.Types.ObjectId,ref:'ItemPresupuesto', require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});


export default mongoose.model("DistribucionPresupuesto", distribucionPresupuestoSchema)