import ConexRedLote from "../models/conexionRedLote.js";

const httpConexRedLote = {
  getTodo: async (req, res) => {
    try {
      const conexion = await ConexRedLote.find()
        .populate("idRed")
        .populate("idLote");
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getConexionById: async (req, res) => {
    try {
      const { id } = req.params;
      const conexion = await ConexRedLote.findById(id)
        .populate("idRed")
        .populate("idLote");

      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Post
  postAgregar: async (req, res) => {
    try {
      const { idRed, idLote } = req.body;

      const conexion = new ConexRedLote({
        idRed,
        idLote,
      });
      await conexion.save();

      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Put
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { idRed, idLote } = req.body;

      const conexion = await ConexRedLote.findByIdAndUpdate(
        id,
        {
          idRed,
          idLote,
        },
        { new: true }
      );
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const conexion = await ConexRedLote.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const conexion = await ConexRedLote.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpConexRedLote;
