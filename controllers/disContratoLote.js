import DisContratoLote from "../models/disContratoLote.js";

const httpDisContratoLote = {
  getAll: async (req, res) => {
    try {
      const distribucion = await DisContratoLote.find()
        .populate("idContrato")
        .populate("idLote");
        console.log(distribucion);
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DisContratoLote.findById(id)
        .populate("idContrato")
        .populate("idLote");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getDistribucionesById: async (req, res) => {
    try {
      const { idContrato } = req.params;
      const distribucion = await DisContratoLote.find({idContrato})
        .populate("idContrato")
        .populate("idLote");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { presupuestoAsignado, idContrato, idLote } = req.body;

      const distribucion = new DisContratoLote({
        presupuestoAsignado,
        presupuestoDisponible: presupuestoAsignado,
        idContrato,
        idLote,
        
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
      const { presupuestoAsignado, idContrato, idLote } = req.body;

      const distribucion = await DisContratoLote.findByIdAndUpdate(
        id,
        {
          presupuestoAsignado,
          presupuestoDisponible:presupuestoAsignado,
          idContrato,
          idLote,
        },
        { new: true }
      )
        .populate("idContrato")
        .populate("idLote");
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
      
      const disContratoLote = await DisContratoLote.findById(id)
      const presupuestoDisponible = disContratoLote.presupuestoDisponible - presupuestoAsignado

      const newPresupuesto = await DisContratoLote.findByIdAndUpdate(
        id,
        { presupuestoDisponible },
        { new: true }
      )
        .populate("idContrato")
        .populate("idLote");

      res.json(newPresupuesto);

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependencia = await DisContratoLote.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      )
      .populate("idContrato")
      .populate("idLote");
      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependencia = await DisContratoLote.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      )
      .populate("idContrato")
      .populate("idLote");
      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpDisContratoLote;
