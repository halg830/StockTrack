import Ficha from "../models/ficha.js";
import Area from "../models/area.js";

const httpFicha = {
  getAll: async (req, res) => {
    try {
      const ficha = await Ficha.find().populate("idArea");
      res.json(ficha);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const ficha = await Ficha.findById({ id }).populate("idArea");
      res.json(ficha);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorNumero: async (req, res) => {
    const { numero } = req.params;

    try {
      const ficha = await Ficha.find(numero).populate("idArea");
      res.json(ficha);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  getPorArea: async (req, res) => {
    try {
      const idArea = req.params;
      const fichasPorArea = await Ficha.find({ idArea }).populate("idArea");
      res.json(fichasPorArea);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las fichas por área" });
    }
  },
  getEstado: async (req, res) => {
    try {
      const estado = req.params;

      const fichasPorEstado = await Ficha.find({ estado }).populate("idArea");

      res.json(fichasPorEstado);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las fichas por estado" });
    }
  },

  post: async (req, res) => {
    try {
      const { codigo, nombre, nivelFormacion, fechaInicio, fechaFin, idArea } =
        req.body;

      const ficha = new Ficha({
        codigo,
        nombre,
        nivelFormacion,
        fechaInicio,
        fechaFin,
        idArea,
      });
      await ficha.save();

      const area = await Area.findById(ficha.idArea);
      ficha.idArea = area;

      res.json(ficha);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { codigo, nombre, nivelFormacion, fechaInicio, fechaFin, idArea } =
        req.body;
      const ficha = await Ficha.findByIdAndUpdate(
        id,
        { codigo, nombre, nivelFormacion, fechaInicio, fechaFin, idArea },
        { new: true }
      );

      const area = await Area.findById(ficha.idArea);
      ficha.idArea = area;

      res.json(ficha);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const ficha = await Ficha.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );

      const area = await Area.findById(ficha.idArea);
      ficha.idArea = area;

      res.json(ficha);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const ficha = await Ficha.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );

      const area = await Area.findById(ficha.idArea);
      ficha.idArea = area;

      res.json(ficha);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};

export default httpFicha;
