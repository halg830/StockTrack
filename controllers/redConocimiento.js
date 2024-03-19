import helpersGeneral from "../helpers/generales.js";
import RedConocimiento from "../models/redConocimineto.js";

const httpRedConocimiento = {
  // Get
  getAll: async (req, res) => {
    try {
      const redes = await RedConocimiento.find();
      res.json(redes);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorNombre: async (req, res) => {
    try {
      const { nombre } = req.params;
      const red = await RedConocimiento.find({ nombre });
      res.json(red);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { nombre } = req.body;
      const red = new RedConocimiento({ 
        nombre: await helpersGeneral.primeraMayuscula(nombre) 
      });
      await red.save();
      res.json(red);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  },

  // Put
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre } = req.body;
      const red = await RedConocimiento.findByIdAndUpdate(id, { nombre: await helpersGeneral.primeraMayuscula(nombre) }, { new: true });

      res.json(red);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    const { id } = req.params;
    const red = await RedConocimiento.findByIdAndUpdate(id, { estado: 0 }, { new: true });

    res.json(red);
  },

  putActivar: async (req, res) => {
    const { id } = req.params;
    const red = await ReD.findByIdAndUpdate(id, { estado: 1 }, { new: true });

    res.json(red);
  },
};

export default httpRedConocimiento;
