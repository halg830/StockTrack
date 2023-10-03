import mongoose from "mongoose";

const distribucionLoteFichaSchema = new mongoose.Schema({
    presupuesto: { type:Number, require:true},
    id_distribucion_presupuesto : {type:String, require:true},
    id_ficha : {type:String, require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});


export default mongoose.model("DistribucionLoteFicha", distribucionLoteFichaSchema)