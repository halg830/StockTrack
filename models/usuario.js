import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String,  require:true },
    apellido: { type: String,  require:true },
    identificacion: { type: String, require:true, unique:true, minlength:7, maxlength: 10 },
    correo: { type: String, require:true},
    telefono: { type: String, required: true, unique:true, minlength:10, maxlength: 10, validate: /^\d{10}$/ },
    rol : {type:String, require:true},
    password : {type:String, require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});


export default mongoose.model("Usuario", usuarioSchema)