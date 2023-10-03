import mongoose from "mongoose";

const distribucionPresupuestoSchema = new mongoose.Schema({
    presupuesto: { type:Number, require:true},
    id_lote : {type:String, require:true},
    id_item : {type:String, require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});


export default mongoose.model("DistribucionPresupuesto", distribucionPresupuestoSchema)