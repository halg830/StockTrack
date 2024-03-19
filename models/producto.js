import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    codigo: {type:String, index: 'text', require:true, unique:true},
    nombre: {type:String, require:true},
    descripcion: {type:String, require:true},
    unidadMedida: {type:String, require:true },
    precioUnitario: {type:Number, require:true},
    consumible: {type:Boolean, require:true},
    iva: {type:Number, require:true},
    tipoProducto: {type: String, require: true},
    idLote: {type:mongoose.Schema.Types.ObjectId,ref:'Lote', require:true},
    estado:{type:Boolean, default:1},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("Producto", productoSchema)