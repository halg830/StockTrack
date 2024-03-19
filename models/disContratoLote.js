import mongoose from "mongoose";

const  disContratoLoteSchema = new mongoose.Schema({
    codigo: { type: String, index:"text", require:true, unique:true},
    presupuestoAsignado: { type:Number, require:true},
    presupuestoDisponible: {type:Number, require:true},
    idContrato:{type:mongoose.Schema.Types.ObjectId,ref:'Contrato', require:true},
    idLote:{type:mongoose.Schema.Types.ObjectId,ref:'Lote', require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});

export default mongoose.model("DistribucionContratoLote", disContratoLoteSchema)

