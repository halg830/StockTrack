import Asignacion from "../models/distribucionLoteFicha.js";

const httpDistribucionLoteFicha = {
  // Get
  getAll: async (req, res) => {
    try {
      const asignaciones = await Asignacion.find()
        .populate({ path: "idDistribucionPresupuesto", populate: [{ path: "idItem" }, { path: "idLote" }] })
        .populate("idFicha");
      res.json(asignaciones);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const asignacion = await Asignacion.findById(id)
      .populate({ path: "idDistribucionPresupuesto", populate: [{ path: "idItem" }, { path: "idLote" }] })
      .populate("idFicha");
      res.json(asignacion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { presupuesto, idDistribucionPresupuesto, idFicha } = req.body;
      const asignacion = new Asignacion({
        presupuesto,
        idDistribucionPresupuesto,
        idFicha,
      });
      await asignacion.save();
      res.json(asignacion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuesto, idDistribucionPresupuesto, idFicha } = req.body;
      const asignacion = await Asignacion.findByIdAndUpdate(
        id,
        { presupuesto, idDistribucionPresupuesto, idFicha },
        { new: true }
      );
      res.json(asignacion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const asignacion = await Asignacion.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );

      // const distribucionPresupuesto = await Asignacion.findById(asignacion.idDistribucionPresupuesto);
      // asignacion.idDistribucionPresupuesto =  distribucionPresupuesto;

      // const item = await Asignacion.findById(asignacion.idDistribucionPresupuesto.idItem);
      // asignacion.idDistribucionPresupuesto.idItem = item;

      // const lote = await Asignacion.findById(asignacion.idDistribucionPresupuesto.idLote);
      // asignacion.idDistribucionPresupuesto.idItem = lote;

      // const ficha = await Asignacion.findById(asignacion.idFicha);
      // asignacion.idFicha = ficha;

      res.json(asignacion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const asignacion = await Asignacion.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );
      // const distribucionPresupuesto = await Asignacion.findById(asignacion.idDistribucionPresupuesto);
      // asignacion.idDistribucionPresupuesto =  distribucionPresupuesto;

      // const item = await Asignacion.findById(asignacion.idDistribucionPresupuesto.idItem);
      // asignacion.idDistribucionPresupuesto.idItem = item;

      // const lote = await Asignacion.findById(asignacion.idDistribucionPresupuesto.idLote);
      // asignacion.idDistribucionPresupuesto.idItem = lote;

      // const ficha = await Asignacion.findById(asignacion.idFicha);
      // asignacion.idFicha = ficha;

      res.json(asignacion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};

export default httpDistribucionLoteFicha;
