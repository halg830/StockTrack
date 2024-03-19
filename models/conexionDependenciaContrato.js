import mongoose from "mongoose";

const conexionDependenciaContratoSchema = new mongoose.Schema({
    idDisDependencia:{type:mongoose.Schema.Types.ObjectId,ref:'DisDependencia', require:true},
    idContrato:{type:mongoose.Schema.Types.ObjectId,ref:'Contrato', require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});

export default mongoose.model("ConexionDependenciaContrato", conexionDependenciaContratoSchema)
