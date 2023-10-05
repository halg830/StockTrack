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
      const { presupuesto, idDistribucionPresupuesto, idFicha } = req.body;

      // Obtener el presupuesto de distribución correspondiente
      const distribucionPresupuesto = await obtenerDistribucionPresupuestoPorId(idDistribucionPresupuesto);

      if (!distribucionPresupuesto) {
        return res.status(404).json({ error: "Distribución de presupuesto no encontrada" });
      }

      // Verificar la validación
      if (presupuesto > distribucionPresupuesto.presupuesto) {
        return res.status(400).json({ error: "El presupuesto asignado es mayor que el presupuesto de distribución." });
      }

      const asignacion = new Asignacion({
        presupuesto,
        idDistribucionPresupuesto,
        idFicha,
      });
      await asignacion.save();
      res.json({ asignacion });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put
  putEditarAsignacion: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuesto, idDistribucionPresupuesto, idFicha } = req.body;

      // Obtener el presupuesto de distribución correspondiente
      const distribucionPresupuesto = await obtenerDistribucionPresupuestoPorId(idDistribucionPresupuesto);

      if (!distribucionPresupuesto) {
        return res.status(404).json({ error: "Distribución de presupuesto no encontrada" });
      }

      // Verificar la validación
      if (presupuesto > distribucionPresupuesto.presupuesto) {
        return res.status(400).json({ error: "El presupuesto asignado es mayor que el presupuesto de distribución." });
      }

      const asignacion = await Asignacion.findByIdAndUpdate(
        id,
        { presupuesto, idDistribucionPresupuesto, idFicha },
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