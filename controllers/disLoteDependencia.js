import DisLoteDependencia from "../models/disLoteDependencia.js";

const httpDisLoteDependencia = {
  getAll: async (req, res) => {
    try {
      const distribucion = await DisLoteDependencia.find()
        .populate("idDisContratoLote")
        .populate("idDisdependencia");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getDistribucionesById: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DisLoteDependencia.findById(id)
        .populate("idDisContratoLote")
        .populate("idDisdependencia");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { codigo, presupuestoAsignado, idDisContratoLote, idDisdependencia } = req.body;

      const distribucion = new DisLoteDependencia({
        codigo,
        presupuestoAsignado,
        presupuestoDisponible: presupuestoAsignado,
        idDisContratoLote,
        idDisdependencia,
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
      const { codigo, presupuestoAsignado, idDisContratoLote, idDisdependencia, year } = req.body;

      const distribucion = await DisLoteDependencia.findByIdAndUpdate(
        id,
        {
          codigo,
          presupuestoAsignado,
          presupuestoDisponible,
          idDisContratoLote,
          idDisdependencia,
          year,
        },
        { new: true }
      )
        .populate("idDisContratoLote")
        .populate("idDisdependencia");
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

      const distribucion = await DisLoteDependencia.findByIdAndUpdate(
        id,
        { presupuestoDisponible },
        { new: true }
      )
        .populate("idDisContratoLote")
        .populate("idDisdependencia");

      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DisLoteDependencia.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      ).populate("idDisContratoLote");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DisLoteDependencia.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      ).populate("idDisContratoLote");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpDisLoteDependencia;
