import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
    nombre: {type:String, require:true},
    estado:{type:Boolean, default:1},
    idFicha:{type:mongoose.Schema.Types.ObjectId,ref:'Ficha', require:true},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("Area", areaSchema)