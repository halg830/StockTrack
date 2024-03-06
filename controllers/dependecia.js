import Dependencia from "../models/dependencia.js";
import DIS
 from "../models/disDependenciaRed.js";
import helpersGeneral from "../helpers/generales.js";


const httpDependenciaPresupuesto = {
  getAll: async (req, res) => {
    try {
      const dependencias = await Dependencia.find().populate('idContrato');
      res.json(dependencias);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const dependencias = await Dependencia.findById(id).populate('idContrato');
      res.json(dependencias);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  getsById: async (req, res) => {
    try {
      const { id } = req.params;
      const dependencias = await Dependencia.finf(id).populate('idContrato');
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
      const { nombre, codigo, idContrato, presupuesto, year } = req.body;

      const fecha = new Date(`${year}-01-02T00:00:00.000Z`);

      const dependencia = new Dependencia({ nombre: await helpersGeneral.primeraMayuscula(nombre), codigo, idContrato, presupuesto, presupuestoDisponible: presupuesto, year:fecha });

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
      const { nombre, codigo, idContrato, presupuesto, year } = req.body;


      const disDependenciaRed = await DistribucionPresupuesto.find({
        idItem: id
      });

      const totalPresupuestos = disItemLote.reduce((total, disItemLote) => {
       return total + disItemLote.presupuesto;
      }, 0);

      const presupuestoDisponible = presupuesto - totalPresupuestos;

      
      const item = await Item.findByIdAndUpdate(
        id,
        { nombre: await helpersGeneral.primeraMayuscula(nombre), presupuesto, presupuestoDisponible, year },
        { new: true }
      );

      res.json(item);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putAjustarPresupuesto: async (req, res) => {
    try {
        const { id } = req.params;
        const { presupuesto} = req.body;

        const item = await Item.findById(id)
        const presupuestoDisponible = item.presupuestoDisponible-presupuesto

        const updatedItem = await Item.findByIdAndUpdate(id,
            {  presupuestoDisponible }, 
            { new: true }
        );

        res.json(updatedItem);

    } catch (error) {
        res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findByIdAndUpdate(id, { estado: 0 }, { new: true });

      res.json(item);
    } catch (error) {
      res.status(400).json({ error });
    }

  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findByIdAndUpdate(id, { estado: 1 }, { new: true });

      res.json(item);
    } catch (error) {
      res.status(400).json({ error });
    }

  },
};

export default httpItemPresupuesto;
