import ConexDependenciaContrato from "../models/conexionDependenciaContrato.js";

const httpConexDependenciaContrato = {

  getTodo: async (req, res) => {
    try {
      const conexion = await ConexDependenciaContrato.find()
        .populate("idDisDependencia").populate('idContrato');
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getConexionById: async (req, res) => {
    try {
      const { id } = req.params;
      const conexion = await ConexDependenciaContrato.findById(id)
        .populate("idDisDependencia").populate('idContrato')
      res.json(conexion)
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });

    }
  },

  // Post
  postAgregar: async (req, res) => {
    try {
      const { idDisDependencia, idContrato } = req.body;

      const conexion = new ConexDependenciaContrato({
        idDisDependencia,
        idContrato,
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
      const { idDisDependencia, idContrato } = req.body;

      const conexion = await ConexDependenciaContrato.findByIdAndUpdate(
        id,
        {
          idDisDependencia,
          idContrato
        }, { new: true }
      )
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const conexion = await ConexDependenciaContrato.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      )
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const conexion = await ConexDependenciaContrato.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      )
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpConexDependenciaContrato;
