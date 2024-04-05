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
  
  getPorLote: async (req, res) => {
    const idLote = req.params.idLote;

    try {
      const conexiones = await ConexRedLote.find( {idLote} ).populate("idRed").populate("idLote")
      res.json(conexiones);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorRed: async (req, res) => {
    const idRed = req.params.idRed;
  
    try {
      const conexiones = await ConexRedLote.find( {idRed} ).populate("idLote").populate("idRed")
 
      res.json(conexiones);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Post
  postAgregar: async (req, res) => {
    try {
      const {codigo, idRed, idLote } = req.body;

      const conexion = new ConexRedLote({
        codigo,
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
      const { codigo, idRed, idLote } = req.body;

      const conexion = await ConexRedLote.findByIdAndUpdate(
        id,
        {
          codigo,
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
