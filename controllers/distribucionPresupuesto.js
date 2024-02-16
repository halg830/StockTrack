import DistribucionPresupuesto from "../models/distribucionPresupuesto.js";
import ItemPresupuesto from "../models/itemsPresupuesto.js";
import Lote from "../models/lote.js";


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
      const { presupuesto, idLote, idItem } = req.body;

      const distribucion = new DistribucionPresupuesto(
        { presupuesto, presupuestoDisponible: presupuesto, idLote, idItem });

      const lote = await Lote.findById(distribucion.idLote);
      distribucion.idLote = lote;

      const item = await ItemPresupuesto.findById(distribucion.idItem);
      distribucion.idItem = item

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
      const { presupuesto, idLote, idItem } = req.body;
      const distribucion = await DistribucionPresupuesto.findByIdAndUpdate(
        id,
        { presupuesto, idLote, idItem },
        { new: true }
      ).populate("idLote").populate("idItem");
      res.json(distribucion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putAjustarPresupuesto: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuesto, presupuestoDisponible } = req.body;

      const item = await ItemPresupuesto.findByIdAndUpdate(id,
        { presupustoDisponible: presupuestoDisponible -= presupuesto },
        { new: true }).populate("idLote").populate("idItem");

      res.json(item);

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
      ).populate("idLote").populate("idItem");
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
      ).populate("idLote").populate("idItem");
      res.json(distribucion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
export default httpDistribucionesPresupuesto;
