import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    codigo: {type:String, require:true, unique:true},
    nombre: {type:String, require:true},
    descripcion: {type:String, require:true},
    unidadMedida: {type:String, require:true },
    precioUnitario: {type:Number, require:true},
    tipoProducto: {type:String, require:true},
    iva: {type:Number, require:true},
    estadoProducto:{ type:String, default:"Pendiente"},
    estado:{type:Boolean, default:1},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("Producto", productoSchema)