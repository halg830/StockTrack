import DistribucionPresupuesto from "../models/distribucionPresupuesto.js";

const httpDistribucionesPresupuesto = {
 
  getAll: async (req, res) => {
    try {
      const distribucion = await DistribucionPresupuesto.find().populate("idLote").populate("idItem");
      res.json(distribucion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { presupuesto, idLote, idItem  } = req.body;

      const distribucion = new DistribucionPresupuesto({ presupuesto, idLote, idItem });
      await distribucion.save();

      res.json(distribucion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuesto, idLote, idItem  } = req.body;
      const distribucion = await DistribucionPresupuesto.findByIdAndUpdate(
        id,
        { presupuesto, idLote, idItem  },
        { new: true }
      );
      res.json(distribucion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DistribucionPresupuesto.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );
      res.json(distribucion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DistribucionPresupuesto.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );
      res.json(distribucion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
export default httpDistribucionesPresupuesto;
