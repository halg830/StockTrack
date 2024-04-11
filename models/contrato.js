import mongoose from "mongoose";

const contratoSchema = new mongoose.Schema({
    nombre: { type: String, require:true, unique: true},
    codigo: { type: String, require:true, unique:true},
    presupuestoAsignado: { type:Number, require:true},
    presupuestoDisponible: {type:Number, require:true},
    idSupervisor: {type:mongoose.Schema.Types.ObjectId,ref:'Usuario', require:true},
    idProveedor: {type:mongoose.Schema.Types.ObjectId,ref:'Proveedor', require:true},
    idProceso: {type:mongoose.Schema.Types.ObjectId,ref:'Proceso', require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});


export default mongoose.model("Contrato", contratoSchema)