import Destino from "../models/destino.js";
import helpersGeneral from "../helpers/generales.js";

const httpDestino = {
  getAll: async (req, res) => {
    try {
      const destino = await Destino.find();
      res.json(destino);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const destino = await Destino.findById({ id });
      res.json(destino);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getPorCodigo: async (req, res) => {
    const { codigo } = req.params;

    try {
      const destino = await Destino.find(codigo);
      res.json(destino);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getEstado: async (req, res) => {
    try {
      const estado = req.params;

      const destinosPorEstado = await Destino.find({ estado });

      res.json(destinosPorEstado);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener las destinos por estado" });
    }
  },

  post: async (req, res) => {
    try {
      const {
        codigo,
        nombre,
        nivelFormacion,
        fechaInicio,
        fechaFin,
        abreviatura,
      } = req.body;

      const destino = new Destino({
        codigo,
        nombre: await helpersGeneral.primeraMayuscula(nombre),
        nivelFormacion,
        fechaInicio,
        fechaFin,
        abreviatura: abreviatura?.toUpperCase(),
      });
      await destino.save();

      res.json(destino);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        codigo,
        nombre,
        nivelFormacion,
        fechaInicio,
        fechaFin,
        abreviatura,
      } = req.body;
      const destino = await Destino.findByIdAndUpdate(
        id,
        {
          codigo,
          nombre: await helpersGeneral.primeraMayuscula(nombre),
          nivelFormacion,
          fechaInicio,
          fechaFin,
          abreviatura: abreviatura?.toUpperCase(),
        },
        { new: true }
      );

      res.json(destino);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const destino = await Destino.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );

      res.json(destino);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const destino = await Destino.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );

      res.json(destino);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};

export default httpDestino;
