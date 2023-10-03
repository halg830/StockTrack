import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    fecha_creacion: {type:Date, require:true },
    fecha_entrega: {type:Date, require:true },
    id_distribucion_lote_ficha: {type:String, require:true},
    id_instructor_encargado: {type:String, require:true},
    subtotal: {type:Number, require:true},
    estado:{type:Boolean, default:"Pendiente"},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("Pedido", pedidoSchema)