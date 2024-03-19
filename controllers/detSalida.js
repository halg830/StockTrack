import DetSalida from "../models/detSalida.js";

const httpDetSalida = {
  getAll: async (req, res) => {
    try {
      const detSalida = await DetSalida.find()
        .populate("idSalida")
        .populate("idEntrada");

      res.json(detSalida);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const detSalida = await DetSalida.findById({ id })
        .populate("idSalida")
        .populate("idEntrada");

      res.json(detSalida);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getBySalida: async (req, res) => {
    try {
      const { idSalida } = req.params;
      const salidas = await DetSalida.find({ idSalida })
        .populate("idSalida")
        .populate("idEntrada");
      res.json(salidas);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  post: async (req, res) => {
    try {
      const { numero, cantidadEntregada, cantidadPendiente, idSalida, idEntrada, subTotal } = req.body;
      const detSalida = new DetSalida({
        numero,
        cantidadEntregada, 
        cantidadPendiente,
        idSalida,
        idEntrada,
        subTotal,
      });
      await detSalida.save();
      res.json(detSalida);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { numero, cantidadEntregada, cantidadPendiente, idSalida, idEntrada, subTotal } = req.body;
      const detSalida = await DetSalida.findByIdAndUpdate(
        id,
        { numero, cantidadEntregada, cantidadPendiente, idSalida, idEntrada, subTotal },
        { new: true }
      );
      res.json(detSalida);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const detSalida = await DetSalida.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );
      res.json(detSalida);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const detSalida = await DetSalida.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );
      res.json(detSalida);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpDetSalida;
