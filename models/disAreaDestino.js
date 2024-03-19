import mongoose from "mongoose";

const disAreaDestinoSchema = new mongoose.Schema({
    presupuestoAsignado: { type:Number, require:true},
    presupuestoDisponible: { type:Number, require:true},
    idDisRedArea: {type:mongoose.Schema.Types.ObjectId,ref:'DisRedArea', require:true},
    idDestino : {type:mongoose.Schema.Types.ObjectId,ref:'Destino', require:true},
    year: {type: Date, require: true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});


export default mongoose.model("DisAreaDestino", disAreaDestinoSchema)