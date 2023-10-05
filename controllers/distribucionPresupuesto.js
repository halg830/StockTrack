import Distribucion from "../models/distribucionPresupuesto.js"

const httpDistribucionesPresupuesto = {
  obtenerAllDistribucion: async (req, res) => {
    //checkear
    try {
      const distribuciones = await Distribucion.find();
      res.json({ distribuciones });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Post
  agregarDistribucion: async (req, res) => {
    // checkear
    try {
      const { nombre, presupuesto } = req.body;
      const itemPresupuesto = new Distribucion({ nombre, presupuesto });

      await itemPresupuesto.save();
      res.json({ itemPresupuesto });
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

      res.json({ distribucion });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  inactivarDistribucion: async (req, res) => {
    //chekear
    const { id } = req.params;
    const distribucion = await Distribucion.findByIdAndUpdate(id, { estado: 0 }, { new: true });

    res.json({ distribucion });
  },

  activarDistribucion: async (req, res) => {
    //chekear
    const { id } = req.params;
    const distribucion = await Distribucion.findByIdAndUpdate(id, { estado: 1 }, { new: true });

    res.json({ distribucion });
  },
};

export default httpDistribucionesPresupuesto;
