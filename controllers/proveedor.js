import Proveedor from "../models/proveedor.js";
import helpersGeneral from "../helpers/generales.js";

const httpProveedor = {
  //Get
  getAll: async (req, res) => {
    try {
      const proveedor = await Proveedor.find();
      res.json(proveedor);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getByCorreo: async (req, res) => {
    try {
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  //Post registro proveedor
  registroProveedor: async (req, res) => {
    try {
      const { nombre, apellido, identificacion, correo, telefono, empresa } =
        req.body;

      const mayusNombre = await helpersGeneral.mayusAllPalabras(nombre.trim());
      const mayusApellido = await helpersGeneral.mayusAllPalabras(
        apellido.trim()
      );
      const proveedor = new Proveedor({
        nombre: mayusNombre,
        apellido: mayusApellido,
        identificacion,
        correo,
        telefono,
        empresa,
      });
      await proveedor.save();

      res.json(proveedor);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  editarProveedor: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, apellido, identificacion, correo, telefono, empresa } =
        req.body;

      const mayusNombre = await helpersGeneral.mayusAllPalabras(nombre.trim());
      const mayusApellido = await helpersGeneral.mayusAllPalabras(
        apellido.trim()
      );

      const proveedor = await Proveedor.findByIdAndUpdate(
        id,
        {
          nombre: mayusNombre,
          apellido: mayusApellido,
          identificacion,
          correo,
          telefono,
          empresa,
        },
        { new: true }
      );

      res.json(proveedor);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const proveedor = await Proveedor.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );
      res.json(proveedor);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;

      const proveedor = await Proveedor.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );
      res.json(proveedor);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpProveedor;
