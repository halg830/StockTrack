import DistribucionPresupuesto from "../models/distribucionPresupuesto.js";
import ItemPresupuesto from "../models/dependencia.js";
import Lote from "../models/lote.js";
import DistLoteFicha from "../models/distribucionLoteFicha.js";

const httpDistribucionesPresupuesto = {

  getAll: async (req, res) => {
    try {
      const distribucion = await DistribucionPresupuesto.find().populate("idLote").populate("idItem");
      res.json(distribucion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getDistribucionesById: async(req, res)=>{
    try {
      const { idItem } = req.params;
      const distribucion = await DistribucionPresupuesto.find({idItem}).populate("idLote").populate("idItem");
      res.json(distribucion)
    } catch (error) {
      res.status(400).json({ error });
      
    }
  },

  getDistribucionById: async(req, res)=>{
    try {
      const { id } = req.params;

      const distribucion = await DistribucionPresupuesto.findById(id).populate("idLote").populate("idItem");
      res.json(distribucion)
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

      const disLoteFicha = await DistLoteFicha.find({
        idDistribucionPresupuesto: id
      });

      const totalPresupuestos = disLoteFicha.reduce((total, disLoteFicha) => {
       return total + disLoteFicha.presupuesto;
      }, 0);

      const presupuestoDisponible = presupuesto - totalPresupuestos;

      const distribucion = await DistribucionPresupuesto.findByIdAndUpdate(
        id,
        { presupuesto, presupuestoDisponible, idLote, idItem },
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
        const { presupuesto} = req.body;

        const item = await DistribucionPresupuesto.findById(id)
        const presupuestoDisponible = item.presupuestoDisponible-presupuesto

        const updatedItem = await DistribucionPresupuesto.findByIdAndUpdate(id,
            {  presupuestoDisponible }, 
            { new: true }
        );

        res.json(updatedItem);

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
