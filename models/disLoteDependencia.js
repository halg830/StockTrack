import mongoose from "mongoose";

const disLoteDependenciaSchema = new mongoose.Schema({
    codigo: { type: String, index:"text", require:true, unique:true},
    presupuestoAsignado: { type:Number, require:true},
    presupuestoDisponible: {type:Number, require:true},
    idDisDependencia:{type:mongoose.Schema.Types.ObjectId,ref:'DisDependencia', require:true},
    idDisContratoLote:{type:mongoose.Schema.Types.ObjectId,ref:'DistribucionContratoLote', require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});

export default mongoose.model("DistribucionLoteDependencia", disLoteDependenciaSchema)