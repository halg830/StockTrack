import mongoose from "mongoose";

const disRedAreaSchema = new mongoose.Schema({
    presupuestoAsignado: { type:Number, require:true},
    presupuestoDisponible: { type:Number, require:true},
    year: {type: Date, require: true},
    idDisDependenciaRed: {type:mongoose.Schema.Types.ObjectId,ref:'DisDependenciaRed', require:true},
    idAreaTematica:{type:mongoose.Schema.Types.ObjectId,ref:'Area', require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});


export default mongoose.model("DisRedArea", disRedAreaSchema)