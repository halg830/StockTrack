import Distribucion from "../models/distribucionPresupuesto.js";

const httpDistribucionesPresupuesto = {
  getAll: async (req, res) => {
    try {
      const distribuciones = await Distribucion.find();
      const distribucionesPromesas = distribuciones.map(async (d) => {
        return await Distribucion.findById(d._id)
          .populate("Lote")
          .populate("ItemPresupuesto");
      });

      const distribucionesPopulate = await Promise.all(distribucionesPromesas);

      res.json({distribuciones: distribucionesPopulate});
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { nombre, presupuesto } = req.body;
      const distribucion = new Distribucion({ nombre, presupuesto });

      await distribucion.save();
      const distribucionesPopulate = await Distribucion.findById(
        distribucion._id
      )
        .populate("Lote")
        .populate("ItemPresupuesto");

      res.json({distribuciones: distribucionesPopulate});
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put
  putEditar: async (req, res) => {
    try {
      const { id, presupuesto } = req.body;
      const distribucion = await Distribucion.findByIdAndUpdate(
        id,
        { presupuesto },
        { new: true }
      );

      const distribucionesPopulate = await Distribucion.findById(
        distribucion._id
      )
        .populate("Lote")
        .populate("ItemPresupuesto");

      res.json({distribuciones: distribucionesPopulate});
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    const { id } = req.params;
    const distribucion = await Distribucion.findByIdAndUpdate(
      id,
      { estado: 0 },
      { new: true }
    );

    const distribucionesPopulate = await Distribucion.findById(distribucion._id)
      .populate("Lote")
      .populate("ItemPresupuesto");

    res.json({distribuciones: distribucionesPopulate});
  },

  putActivar: async (req, res) => {
    const { id } = req.params;
    const distribucion = await Distribucion.findByIdAndUpdate(
      id,
      { estado: 1 },
      { new: true }
    );

    const distribucionesPopulate = await Distribucion.findById(distribucion._id)
      .populate("Lote")
      .populate("ItemPresupuesto");

    res.json({distribuciones: distribucionesPopulate});
  },
};

export default httpDistribucionesPresupuesto;
