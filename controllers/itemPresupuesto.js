import Item from "../models/ItemPresupuesto.js";

const httpItemPresupuesto = {
  obtenerAllItem: async (req, res) => {
    //checkear
    try {
      const items = await Item.find();
      res.json({ items });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  buscarItem: async (req, res) => {
    //checkear
    try {
      const { nombre } = req.params;
      const item = await Item.find({ nombre });
      res.json({ item });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Post
  agregarItem: async (req, res) => {
    // checkear
    try {
      const { nombre, presupuesto } = req.body;
      const itemPresupuesto = new Item({ nombre, presupuesto });

      await itemPresupuesto.save();
      res.json({ itemPresupuesto });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put
  editarItem: async (req, res) => {
    //checkear
    try {
      const { id, presupuesto } = req.body;
      const item = await Item.findByIdAndUpdate(
        id,
        { presupuesto },
        { new: true }
      );

      res.json({ item });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  inactivarItem: async (req, res) => {
    //chekear
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, { estado: 0 }, { new: true });

    res.json({ item });
  },

  activarItem: async (req, res) => {
    //chekear
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, { estado: 1 }, { new: true });

    res.json({ item });
  },

  
};

export default httpItemPresupuesto;
