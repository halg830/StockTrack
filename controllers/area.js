import Area from "../models/area.js";

const httpArea = {
  getAll: async (req, res) => {
    try {
      const areas = await Area.find();
      res.json(areas);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const area = await Area.findById(id);
      res.json(area);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  post: async (req, res) => {
    try {
      const { nombre } = req.body;
      const nuevaArea = new Area({ nombre });
      const areaGuardada = await nuevaArea.save();
      res.json({ area: areaGuardada });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre } = req.body;
      const areaActualizada = await Area.findByIdAndUpdate(
        id,
        { nombre },
        { new: true }
      );
      res.json({ area: areaActualizada });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};

export default httpArea;
