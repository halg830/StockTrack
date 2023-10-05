import Lote from "../models/lote.js";

const httpLote = {
  // Get
  obtenerLotes: async (req, res) => {
    //checkear
    try {
      const lotes = await Lote.find();
      res.json({ lotes });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  buscarLote: async (req, res) => {
    //checkear
    try {
      const { nombre } = req.params;
      const lote = await Lote.find({ nombre });
      res.json({ lote });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Post
  agregarLote: async (req, res) => {
    //chekear
    try {
      const { nombre, presupuesto } = req.body;
      const lote = new Lote({ nombre, presupuesto });

      await lote.save();
      res.json({ lote });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put
  editarLote: async (req, res) => {
    //checkear
    try {
      const { id, presupuesto } = req.body;
      const lote = await Lote.findByIdAndUpdate(
        id,
        { presupuesto },
        { new: true }
      );

      res.json({ lote });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  inactivarLote: async (req, res) => {
    //chekear
    const { id } = req.params;
    const lote = await Lote.findByIdAndUpdate(
      id,
      { estado:0 },
      { new: true }
    );

    res.json({ lote });
  },
  
  activarLote: async (req, res) => {
    //chekear
    const { id } = req.params;
    const lote = await Lote.findByIdAndUpdate(
      id,
      { estado:1 },
      { new: true }
    );

    res.json({ lote });
  },
};

export default httpLote;
