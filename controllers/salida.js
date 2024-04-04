import Salida from "../models/salida.js";
import DetSalida from '../models/detSalida.js';

const httpSalida = {
  getAll: async (req, res) => {
    try {
      const salidas = await Salida.find().populate("idPedido").populate("idAdmin");

      const detSalidas = salidas.map(async (e) => {
        e.detSalida= await DetSalida.find({idPedido:e._id});
      });

      await Promise.all(detSalidas);

      res.json(salidas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPorId: async (req, res) => {
    try {
      const salida = await Salida.findById(req.params.id).populate("idPedido").populate("idAdmin");
      if (!salida) {
        return res.status(404).json({ mensaje: "Salida no encontrada" });
      }
      res.json(salida);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getNumero: async (req, res) => {
    try {
      const ultimoSalida = await Salida.findOne().sort({ numero: -1 });    
      console.log(ultimoSalida);
      let numero = ultimoSalida ? ultimoSalida.numero : 0;
      numero+=1
      res.json(numero)       
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  post: async (req, res) => {
    try {
      const {idAdmin, idPedido, entregado, total, detSalidas} = req.body;

      const ultimoSalida = await Salida.findOne().sort({ numero: -1 });    
      console.log(ultimoSalida);
      let numero = ultimoSalida ? ultimoSalida.numero : 0;
      numero+=1

      console.log(numero);

      const nuevoSalida = new Salida({idAdmin, idPedido, total, entregado, numero});
      const salidaGuardado = await nuevoSalida.save();

      detSalidas.forEach(detSalida => {
        const nuevoDetSalida = new DetSalida({})
      });
      res.status(201).json(salidaGuardado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  putEditar: async (req, res) => {
    try {
      const salidaActualizado = await Salida.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!salidaActualizado) {
        return res.status(404).json({ mensaje: "Salida no encontrado" });
      }
      res.json(salidaActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default httpSalida
