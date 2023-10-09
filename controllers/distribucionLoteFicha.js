import Asignacion from "../models/distribucionLoteFicha.js";

const controladorDistribucionLoteFicha = {
  // Get
  getAsignaciones: async (req, res) => {
    try {
      const asignaciones = await Asignacion.find();
      res.json({ asignaciones });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getAsignacionById: async (req, res) => {
    try {
      const { id } = req.params;
      const asignacion = await Asignacion.findById(id);
      res.json({ asignacion });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Post
  postAsignacion: async (req, res) => {
    try {
      const { presupuesto, id_distribucion_presupuesto, id_ficha } = req.body;
      const asignacion = new Asignacion({
        presupuesto,
        id_distribucion_presupuesto,
        id_ficha,
      });
      await asignacion.save();
      res.json({ asignacion });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // PutEditar
  putEditarAsignacion: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuesto, id_distribucion_presupuesto, id_ficha } = req.body;
      const asignacion = await Asignacion.findByIdAndUpdate(
        id,
        { presupuesto, id_distribucion_presupuesto, id_ficha },
        { new: true }
      );
      res.json({ asignacion });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Delete 
  deleteAsignacion: async (req, res) => {
    try {
      const { id } = req.params;
      const asignacion = await Asignacion.findByIdAndDelete(id);
      res.json(`Asignación eliminada: ${asignacion}`);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put inactivar
  putAsignacionInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const asignacion = await Asignacion.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );
      res.json({ asignacion });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};

export default controladorDistribucionLoteFicha;