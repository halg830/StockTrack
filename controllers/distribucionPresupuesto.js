import Distribucion from "../models/distribucionPresupuesto.js";

const httpDistribucionesPresupuesto = {
  obtenerAllDistribucion: async (req, res) => {
    //checkear
    try {
      const distribuciones = await Distribucion.find();
      const distribucionesPromesas = distribuciones.map(async (d) => {
        return await Distribucion.findById(d._id)
          .populate("Lote")
          .populate("ItemPresupuesto")
      });

      const distribucionesPopulate = await Promise.all(distribucionesPromesas);

      res.json({ distribucionesPopulate });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Post
  agregarDistribucion: async (req, res) => {
    // checkear
    try {
      const { nombre, presupuesto } = req.body;
      const distribucion = new Distribucion({ nombre, presupuesto });

      await distribucion.save();
      const distribucionesPopulate = await Distribucion.findById(
        distribucion._id
      )
        .populate("Lote")
        .populate("ItemPresupuesto")

      res.json({ distribucionesPopulate });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put
  editarDistribucion: async (req, res) => {
    //checkear
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
        .populate("ItemPresupuesto")

      res.json({ distribucionesPopulate });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  inactivarDistribucion: async (req, res) => {
    //chekear
    const { id } = req.params;
    const distribucion = await Distribucion.findByIdAndUpdate(
      id,
      { estado: 0 },
      { new: true }
    );

    const distribucionesPopulate = await Distribucion.findById(
      distribucion._id
    )
      .populate("Lote")
      .populate("ItemPresupuesto")

    res.json({ distribucionesPopulate });
  },

  activarDistribucion: async (req, res) => {
    //chekear
    const { id } = req.params;
    const distribucion = await Distribucion.findByIdAndUpdate(
      id,
      { estado: 1 },
      { new: true }
    );

    const distribucionesPopulate = await Distribucion.findById(
      distribucion._id
    )
      .populate("Lote")
      .populate("ItemPresupuesto")

    res.json({ distribucionesPopulate });
  },
};

export default httpDistribucionesPresupuesto;
