import Item from "../models/itemsPresupuesto.js";

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
      const { nombre, presupuesto } = req.body;
      const itemPresupuesto = new Item({ nombre, presupuesto });

      await itemPresupuesto.save();
      res.json(itemPresupuesto);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put
  putEditar: async (req, res) => {
    try {
      const {id} = req.params;
      const { nombre, presupuesto } = req.body;
      const item = await Item.findByIdAndUpdate(
        id,
        { nombre, presupuesto },
        { new: true }
      );

      res.json(item);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, { estado: 0 }, { new: true });

    res.json(item);
  },

  putActivar: async (req, res) => {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, { estado: 1 }, { new: true });

    res.json( item );
  },
};

export default httpItemPresupuesto;
