import mongoose from "mongoose";

const procesoSchema = new mongoose.Schema({
    codigo: {type: String, require: true},
    presupuestoAsignado: { type:Number, require:true},
    presupuestoDisponible: { type:Number, require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});


export default mongoose.model("Proceso", procesoSchema)