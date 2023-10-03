import mongoose from "mongoose";

const usuario = new mongoose.Schema({
    nombre: { type: String, minlenght: 5, require:true },
    identificacion: { type: String, require:true, unique:true },
    correo: { type: String, require:true},
    telefono: { type: String, required: true, validate: /^\d{10}$/ },
    rol : {type:String, require:true},
    contraseña : {type:String, require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});


export default mongoose.model("Usuario", usuario)