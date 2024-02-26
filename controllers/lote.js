import helpersGeneral from "../helpers/generales.js";
import Lote from "../models/lote.js";

const httpLote = {
  // Get
  getAll: async (req, res) => {
    try {
      const lotes = await Lote.find();
      res.json(lotes);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorNombre: async (req, res) => {
    try {
      const { nombre } = req.params;
      const lote = await Lote.find({ nombre });
      res.json(lote);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { nombre } = req.body;
      const lote = new Lote({ nombre: await helpersGeneral.primeraMayuscula(nombre) });

      await lote.save();
      res.json(lote);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  },

  // Put
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre } = req.body;
      const lote = await Lote.findByIdAndUpdate(id, { nombre: await helpersGeneral.primeraMayuscula(nombre) }, { new: true });

      res.json(lote);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    const { id } = req.params;
    const lote = await Lote.findByIdAndUpdate(id, { estado: 0 }, { new: true });

    res.json(lote);
  },

  putActivar: async (req, res) => {
    const { id } = req.params;
    const lote = await Lote.findByIdAndUpdate(id, { estado: 1 }, { new: true });

    res.json(lote);
  },
};

export default httpLote;
