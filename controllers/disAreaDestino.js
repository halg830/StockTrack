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
      const { idDisRedArea } = req.params;
      const distribucion = await DisAreaDestino.find({idDisRedArea})
        .populate({path:"idDisRedArea",populate: [{ path: "idAreaTematica"}]})
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
      const { presupuestoAsignado, idDisRedArea, idDestino} = req.body;

      const distribucion = new DisAreaDestino({
        presupuestoAsignado,
        presupuestoDisponible: presupuestoAsignado,
        idDisRedArea,
        idDestino,
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
      const { presupuestoAsignado, idDisRedArea, idDestino} = req.body;

      const distribucion = await DisAreaDestino.findByIdAndUpdate(
        id,
        {
          presupuestoAsignado,
          idDisRedArea,
          idDestino,
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
      const { presupuestoAsignado } = req.body;

      const disAreaDestino = await DisAreaDestino.findById(id)
      const presupuestoDisponible = disAreaDestino.presupuestoDisponible - presupuestoAsignado

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
