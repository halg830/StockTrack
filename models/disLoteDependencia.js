import mongoose from "mongoose";

const disLoteDependenciaSchema = new mongoose.Schema({
    codigo: { type: String, index:"text", require:true, unique:true},
    presupuestoAsignado: { type:Number, require:true},
    presupuestoDisponible: {type:Number, require:true},
    idDependencia:{type:mongoose.Schema.Types.ObjectId,ref:'Dependencia', require:true},
    idDisContratoLote:{type:mongoose.Schema.Types.ObjectId,ref:'DistribucionContratoLote', require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});

export default mongoose.model("DistribucionLoteDependencia", disLoteDependenciaSchema)