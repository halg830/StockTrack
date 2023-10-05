import Area from "../models/area.js"; 

const httpArea = {
  obtenerAreas: async (req, res) => {
    try {
      const areas = await Area.find();
      res.json({ areas });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  obtenerAreaPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const area = await Area.findById(id);
      res.json({ area });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  crearArea: async (req, res) => {
    try {
      const { nombre } = req.body;
      const nuevaArea = new Area({ nombre });
      const areaGuardada = await nuevaArea.save();
      res.json({ area: areaGuardada });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  actualizarArea: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre } = req.body;
      const areaActualizada = await Area.findByIdAndUpdate(id, { nombre }, { new: true });
      res.json({ areaActualizada });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  eliminarArea: async (req, res) => {
    try {
      const { id } = req.params;
      await Area.findByIdAndDelete(id);
      res.json({ mensaje: "Área eliminada exitosamente" });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

};

export default httpArea;
