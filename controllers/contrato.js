import Contrato from "../models/contrato.js";
import helpersGeneral from "../helpers/generales.js";

const httpContrato = {
  getAll: async (req, res) => {
    try {
      const contratos = await Contrato.find();
      res.json(contratos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const contrato = await Contrato.findById(id);
      res.json(contrato);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getPorNombre: async (req, res) => {
    try {
      const { nombre } = req.params;
      const contrato = await Contrato.find({ nombre });
      res.json(contrato);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { nombre, codigo, presupuestoAsignado } = req.body;

      const fecha = new Date(`${year}-01-02T00:00:00.000Z`);

      const contrato = new Contrato({
        nombre: await helpersGeneral.primeraMayuscula(nombre),
        codigo,
        presupuestoAsignado,
        presupuestoDisponible: presupuestoAsignado,
      });
      await contrato.save();
      res.json(contrato);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Put
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, codigo, presupuestoAsignado } = req.body;

      const contrato = await Contrato.findByIdAndUpdate(
        id,
        {
          nombre: await helpersGeneral.primeraMayuscula(nombre),
          codigo,
          presupuestoAsignado,
          presupuestoDisponible,
        },
        { new: true }
      );

      res.json(contrato);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putAjustarPresupuesto: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuestoAsignado } = req.body;

      const contrato = await Contrato.findById(id);
      const presupuestoDisponible =
        contrato.presupuestoDisponible - presupuestoAsignado;

      const updatedContrato = await Contrato.findByIdAndUpdate(
        id,
        { presupuestoDisponible },
        { new: true }
      );

      res.json(updatedContrato);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const contrato = await Contrato.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );

      res.json(contrato);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const contrato = await Contrato.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );

      res.json(contrato);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};

export default httpContrato;
