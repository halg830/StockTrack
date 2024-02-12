import mongoose from "mongoose";

const itemsPresupuestoSchema = new mongoose.Schema({
    nombre: { type: String, index: "text", require:true, unique: true},
    presupuesto: { type:Number, require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});


export default mongoose.model("ItemPresupuesto", itemsPresupuestoSchema)