import mongoose from "mongoose";

const disDependencia = new mongoose.Schema({
    presupuestoAsignado: { type:Number, require:true},
    presupuestoDisponible: { type:Number, require:true},
    idDependencia: {type:mongoose.Schema.Types.ObjectId,ref:'Dependencia', require:true},
    year: {type: Date, require: true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});


export default mongoose.model("DisDependencia", disDependencia)