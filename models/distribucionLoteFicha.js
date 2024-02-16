import mongoose from "mongoose";

const distribucionLoteFichaSchema = new mongoose.Schema({
    presupuesto: { type:Number, require:true},
    presupuestoDisponible: { type:Number, require:true},
    idDistribucionPresupuesto: {type:mongoose.Schema.Types.ObjectId,ref:'DistribucionPresupuesto', require:true},
    idFicha:{type:mongoose.Schema.Types.ObjectId,ref:'Ficha', require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});


export default mongoose.model("DistribucionLoteFicha", distribucionLoteFichaSchema)