import DisAreaDestino from "../models/disAreaDestino.js";

const httpDisAreaDestino = {
  getAll: async (req, res) => {
    try {
      const distribucion = await DisAreaDestino.find()
        .populate("idDisRedArea")
        .populate("idDestino");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getDistribucionesById: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DisAreaDestino.findById(id)
        .populate("idDisRedArea")
        .populate("idDestino");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { presupuestoAsignado, idDisRedArea, idDestino, year } = req.body;

      const distribucion = new DisAreaDestino({
        presupuestoAsignado,
        presupuestoDisponible: presupuestoAsignado,
        idDisRedArea,
        idDestino,
        year,
      });
      await distribucion.save();

      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Put
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuestoAsignado, idDisRedArea, idDestino, year } = req.body;

      const distribucion = await DisAreaDestino.findByIdAndUpdate(
        id,
        {
          presupuestoAsignado,
          presupuestoDisponible,
          idDisRedArea,
          idDestino,
          year,
        },
        { new: true }
      )
        .populate("idDisRedArea")
        .populate("idDestino");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putAjustarPresupuesto: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuestoDisponible } = req.body;

      const disDependencia = await DisAreaDestino.findByIdAndUpdate(
        id,
        { presupuestoDisponible },
        { new: true }
      )
        .populate("idDisRedArea")
        .populate("idDestino");

      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependencia = await DisAreaDestino.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      ).populate("idDisRedArea");
      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependencia = await DisAreaDestino.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      ).populate("idDisRedArea");
      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpDisAreaDestino;
