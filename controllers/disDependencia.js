import DisDependencia from "../models/disDependencia.js";
import Dependencia from "../models/dependencia.js";

const httpDisDependencia = {
  getAll: async (req, res) => {
    try {
      const distribucion = await DisDependencia.find().populate(
        "idDependencia"
      );
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getDistribucionesById: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DisDependencia.find(id).populate(
        "idDependencia"
      );
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { presupuestoAsignado, idDependencia } = req.body;

      const distribucion = new DisDependencia({
        presupuestoAsignado,
        presupuestoDisponible: presupuestoAsignado,
        idDependencia,
      });
      await distribucion.save();

      const dependencia = await Dependencia.findById(
        distribucion.idDependencia
      );
      distribucion.idDependencia = dependencia;

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
      const { presupuestoAsignado, idDependencia } = req.body;

      const distribucion = await DisDependencia.findByIdAndUpdate(
        id,
        {
          presupuestoAsignado,
          presupuestoDisponible: presupuestoAsignado,
          idDependencia,
        },
        { new: true }
      ).populate("idDependencia");
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

      const disDependencia = await DisDependencia.findById(id);
      const presupuestoDisponible =
        disDependencia.presupuestoDisponible - presupuestoAsignado;

      const disDependenciaUpdate = await DisDependencia.findByIdAndUpdate(
        id,
        { presupuestoDisponible },
        { new: true }
      ).populate("idDependencia");

      res.json(disDependenciaUpdate);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependencia = await DisDependencia.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      ).populate("idDependencia");
      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependencia = await DisDependencia.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      ).populate("idDependencia");
      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpDisDependencia;
