import mongoose, { trusted } from "mongoose";

const productoSchema = new mongoose.Schema({
    codigo: {type:String, require:true},
    nombre: {type:String, require:true},
    descripcion: {type:String, require:true},
    unidad_medida: {type:String, require:true },
    precio_unitario: {type:Number, require:true},
    iva: {type:Number, require:true},
    consumible: {type:Number, require:true},
    estado:{type:Boolean, default:1},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("Producto", productoSchema)