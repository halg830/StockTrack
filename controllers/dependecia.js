import Dependencia from "../models/dependencia.js";
import DisDependenciaRed from "../models/disDependenciaRed.js";
import helpersGeneral from "../helpers/generales.js";


const httpDependencia = {
  getAll: async (req, res) => {
    try {
      const dependencias = await Dependencia.find();
      res.json(dependencias);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const dependencias = await Dependencia.findById(id);
      res.json(dependencias);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  getsById: async (req, res) => {
    try {
      const { id } = req.params;
      const dependencias = await Dependencia.finf(id);
      res.json(dependencias);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorNombre: async (req, res) => {
    try {
      const { nombre } = req.params;
      const dependencia = await Dependencia.find({ nombre });
      res.json(dependencia);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { nombre, codigo, presupuestoAsignado, year } = req.body;

      const fecha = new Date(`${year}-01-02T00:00:00.000Z`);

      const dependencia = new Dependencia({ 
        nombre: await helpersGeneral.primeraMayuscula(nombre), 
        codigo, 
        presupuestoAsignado, 
        presupuestoDisponible: presupuestoAsignado, 
        year:fecha 
      });
      await dependencia.save();
      res.json(dependencia);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, codigo, presupuestoAsignado, year } = req.body;


      const disDependenciaRed = await DisDependenciaRed.find({
        idDependencia: id
      });

      const totalPresupuestos = disDependenciaRed.reduce((total, disDependenciaRed) => {
       return total + disDependenciaRed.presupuesto;
      }, 0);

      const presupuestoDisponible = presupuesto - totalPresupuestos;

      
      const dependencia = await Dependencia.findByIdAndUpdate(
        id,
        { nombre: await helpersGeneral.primeraMayuscula(nombre), 
          codigo,
          presupuestoAsignado, 
          presupuestoDisponible, 
          year },
        { new: true }
      );

      res.json(dependencia);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putAjustarPresupuesto: async (req, res) => {
    try {
        const { id } = req.params;
        const { presupuestoAsignado} = req.body;

        const dependencia = await Dependencia.findById(id)
        const presupuestoDisponible = dependencia.presupuestoDisponible-presupuestoAsignado

        const updatedDependencia = await Dependencia.findByIdAndUpdate(id,
            {  presupuestoDisponible }, 
            { new: true }
        );

        res.json(updatedDependencia);

    } catch (error) {
        res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const dependencia = await Dependencia.findByIdAndUpdate(id, { estado: 0 }, { new: true });

      res.json(dependencia);
    } catch (error) {
      res.status(400).json({ error });
    }

  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const dependencia = await Dependencia.findByIdAndUpdate(id, { estado: 1 }, { new: true });

      res.json(dependencia);
    } catch (error) {
      res.status(400).json({ error });
    }

  },
};

export default httpDependencia;
