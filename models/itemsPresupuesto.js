import mongoose from "mongoose";

const itemsPresupuestoSchema = new mongoose.Schema({
    nombre: { type: String, minlenght: 5, require:true },
    presupuesto: { type:Number, require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});


export default mongoose.model("ItemPresupuesto", itemsPresupuestoSchema)