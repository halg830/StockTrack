import DisLoteDependencia from "../models/disLoteDependencia.js";

const httpDisLoteDependencia = {
  getAll: async (req, res) => {
    try {
      const distribucion = await DisLoteDependencia.find()
      .populate({ path: "idDisContratoLote", populate: [{ path: "idContrato" }, { path: "idLote" }] })
        .populate("idDependencia");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DisLoteDependencia.findById(id)
        .populate({ path: "idDisContratoLote", populate: [{ path: "idContrato" }, { path: "idLote" }] })
        .populate("idDependencia");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  getDistribucionesById: async (req, res) => {
    try {
      const { idDependencia } = req.params;
      const distribucion = await DisLoteDependencia.find({idDependencia})
        .populate({ path: "idDisContratoLote", populate: [{ path: "idContrato" }, { path: "idLote" }] })
        .populate("idDependencia");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { presupuestoAsignado, idDisContratoLote, idDependencia } = req.body;

      const distribucion = new DisLoteDependencia({
        presupuestoAsignado,
        presupuestoDisponible: presupuestoAsignado,
        idDisContratoLote,
        idDependencia,
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
      const { presupuestoAsignado, idDisContratoLote, idDependencia } = req.body;

      const distribucion = await DisLoteDependencia.findByIdAndUpdate(
        id,
        {
          presupuestoAsignado,
          presupuestoDisponible:presupuestoAsignado,
          idDisContratoLote,
          idDependencia,
        },
        { new: true }
      )
        .populate({ path: "idDisContratoLote", populate: [{ path: "idContrato" }, { path: "idLote" }] })
        .populate("idDependencia");
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

      const disLoteDependencia = await DisLoteDependencia.findById(id)
      const presupuestoDisponible = disLoteDependencia.presupuestoDisponible - presupuestoAsignado

      const distribucion = await DisLoteDependencia.findByIdAndUpdate(
        id,
        { presupuestoDisponible },
        { new: true }
      )
        .populate({ path: "idDisContratoLote", populate: [{ path: "idContrato" }, { path: "idLote" }] })
        .populate("idDependencia");

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
      )
      .populate({ path: "idDisContratoLote", populate: [{ path: "idContrato" }, { path: "idLote" }] })
      .populate("idDependencia");
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
      )
      .populate({ path: "idDisContratoLote", populate: [{ path: "idContrato" }, { path: "idLote" }] })
      .populate("idDependencia");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpDisLoteDependencia;
