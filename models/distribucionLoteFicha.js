import mongoose from "mongoose";

const distribucionLoteFichaSchema = new mongoose.Schema({
    presupuesto: { type:Number, require:true},
    id_distribucion_presupuesto: {type:mongoose.Schema.Types.ObjectId,ref:'DistribucionPresupuesto', require:true},
    id_ficha:{type:mongoose.Schema.Types.ObjectId,ref:'Ficha', require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});


export default mongoose.model("DistribucionLoteFicha", distribucionLoteFichaSchema)