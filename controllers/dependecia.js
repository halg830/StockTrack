import Dependencia from "../models/dependencia.js";
import helpersGeneral from "../helpers/generales.js";

const httpDependencia = {
  getAll: async (req, res) => {
    try {
      const dependencias = await Dependencia.find();
      res.json(dependencias);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const dependencias = await Dependencia.findById(id);
      res.json(dependencias);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  getsById: async (req, res) => {
    try {
      const { id } = req.params;
      const dependencias = await Dependencia.finf(id);
      res.json(dependencias);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getPorNombre: async (req, res) => {
    try {
      const { nombre } = req.params;
      const dependencia = await Dependencia.find({ nombre });
      res.json(dependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { nombre, codigo } = req.body;

      const dependencia = new Dependencia({ 
        nombre: await helpersGeneral.primeraMayuscula(nombre), 
        codigo, 
      });
      await dependencia.save();
      res.json(dependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Put
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, codigo } = req.body;

      const dependencia = await Dependencia.findByIdAndUpdate(
        id,
        { nombre: await helpersGeneral.primeraMayuscula(nombre), 
          codigo, },
        { new: true }
      );

      res.json(dependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const dependencia = await Dependencia.findByIdAndUpdate(id, { estado: 0 }, { new: true });

      res.json(dependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }

  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const dependencia = await Dependencia.findByIdAndUpdate(id, { estado: 1 }, { new: true });

      res.json(dependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }

  },
};

export default httpDependencia;
