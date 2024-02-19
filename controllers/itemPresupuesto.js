import Item from "../models/itemsPresupuesto.js";
import DistribucionPresupuesto from "../models/distribucionPresupuesto.js";
import helpersGeneral from "../helpers/generales.js";


const httpItemPresupuesto = {
  getAll: async (req, res) => {
    try {
      const items = await Item.find();
      res.json(items);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorNombre: async (req, res) => {
    try {
      const { nombre } = req.params;
      const item = await Item.find({ nombre });
      res.json(item);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { nombre, presupuesto, year } = req.body;

      const fecha = new Date(`${year}-01-02T00:00:00.000Z`);

      const itemPresupuesto = new Item({ nombre: await helpersGeneral.primeraMayuscula(nombre), presupuesto, presupuestoDisponible: presupuesto, year:fecha });

      await itemPresupuesto.save();
      res.json(itemPresupuesto);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, presupuesto, year } = req.body;
      const item = await Item.findByIdAndUpdate(
        id,
        { nombre: await helpersGeneral.primeraMayuscula(nombre), presupuesto, year },
        { new: true }
      );

      res.json(item);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putAjustarPresupuesto: async (req, res) => {
    try {
        const { id } = req.params;
        const { presupuesto} = req.body;

        const item = await Item.findById(id)
        const presupuestoDisponible = item.presupuestoDisponible-presupuesto

        const updatedItem = await Item.findByIdAndUpdate(id,
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
      const item = await Item.findByIdAndUpdate(id, { estado: 0 }, { new: true });

      res.json(item);
    } catch (error) {
      res.status(400).json({ error });
    }

  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findByIdAndUpdate(id, { estado: 1 }, { new: true });

      res.json(item);
    } catch (error) {
      res.status(400).json({ error });
    }

  },
};

export default httpItemPresupuesto;
