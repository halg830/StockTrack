import Contrato from "../models/contrato.js";
import DisContratoLote from "../models/disContratoLote.js";
import helpersGeneral from "../helpers/generales.js";


const httpContrato= {
  getAll: async (req, res) => {
    try {
      const contratos = await Contrato.find();
      res.json(contratos);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const contrato = await Contrato.findById(id);
      res.json(contrato);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  getsById: async (req, res) => {
    try {
      const { id } = req.params;
      const contrato = await Contrato.finf(id);
      res.json(contrato);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorNombre: async (req, res) => {
    try {
      const { nombre } = req.params;
      const contrato = await Contrato.find({ nombre });
      res.json(contrato);
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


      const disContratoLote = await DisContratoLote.find({
        idContrato: id
      });

      const totalPresupuestos = disContratoLote.reduce((total, disContratoLote) => {
       return total + disContratoLote.presupuesto;
      }, 0);

      const presupuestoDisponible = presupuesto - totalPresupuestos;

      
      const contrato = await Contrato.findByIdAndUpdate(
        id,
        { nombre: await helpersGeneral.primeraMayuscula(nombre), 
          codigo,
          presupuestoAsignado, 
          presupuestoDisponible, 
          year },
        { new: true }
      );

      res.json(contrato);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putAjustarPresupuesto: async (req, res) => {
    try {
        const { id } = req.params;
        const { presupuestoAsignado} = req.body;

        const contrato = await Contrato.findById(id)
        const presupuestoDisponible = contrato.presupuestoDisponible-presupuestoAsignado

        const updatedContrato = await Contrato.findByIdAndUpdate(id,
            {  presupuestoDisponible }, 
            { new: true }
        );

        res.json(updatedContrato);

    } catch (error) {
        res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const contrato = await Contrato.findByIdAndUpdate(id, { estado: 0 }, { new: true });

      res.json(contrato);
    } catch (error) {
      res.status(400).json({ error });
    }

  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const contrato = await Contrato.findByIdAndUpdate(id, { estado: 1 }, { new: true });

      res.json(contrato);
    } catch (error) {
      res.status(400).json({ error });
    }

  },
};

export default httpContrato;
