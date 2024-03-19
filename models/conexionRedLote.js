import mongoose from "mongoose";

const ConexionRedLoteSchema = new mongoose.Schema({
    codigo: { type: String, index:"text", require:true, unique:true},
    idLote:{type:mongoose.Schema.Types.ObjectId,ref:'Lote', require:true},
    idRed:{type:mongoose.Schema.Types.ObjectId,ref:'RedConocimiento', require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});

export default mongoose.model("ConexionRedLote", ConexionRedLoteSchema)
