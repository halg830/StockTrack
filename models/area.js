import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  nombre: { type: String, require: true, unique: true },
  estado: { type: Boolean, default: 1 },
  createAT: { type: Date, default: Date.now },
});

export default mongoose.model("Area", areaSchema);
