import mongoose from "mongoose";

const contratoSchema = new mongoose.Schema({
    codigo: { type: String, index:"text", require:true, unique:true},
    presupuestoAsignado: { type:Number, require:true},
    presupuestoDisponible: {type:Number, require:true},
    idContrato:{type:mongoose.Schema.Types.ObjectId,ref:'Contrato', require:true},
    idConexionRedLote:{type:mongoose.Schema.Types.ObjectId,ref:'Contrato', require:true},
    year: {type: Date, require: true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});

export default mongoose.model("Contrato", contratoSchema)
