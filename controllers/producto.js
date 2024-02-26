import Producto from "../models/producto.js";
import Lote from "../models/lote.js";
import helpersGeneral from "../helpers/generales.js";

const httpProducto = {
  getAll: async (req, res) => {
    try {
      const producto = await Producto.find().populate("idLote");
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getByLote: async (req, res) => {
    try {
      const { idLote } = req.params;
      const productos = await Producto.find({ idLote }).populate("idLote");
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getPorFechas: async (req, res) => {
    try {
      const { fechaInicio, fechaFin } = req.query;

      if (!fechaInicio || !fechaFin) {
        return res
          .status(400)
          .json({ error: "Debes proporcionar fechas de inicio y fin." });
      }

      const producto = await Producto.find({
        fecha_agg: {
          $gte: new Date(fechaInicio),
          $lte: new Date(fechaFin),
        },
      });
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  post: async (req, res) => {
    try {
      const {
        codigo,
        nombre,
        descripcion,
        unidadMedida,
        precioUnitario,
        iva,
        tipoProducto,
        consumible,
        idLote,
      } = req.body;
      const producto = new Producto({
        codigo,
        nombre: await helpersGeneral.primeraMayuscula(nombre),
        descripcion,
        unidadMedida,
        precioUnitario,
        iva,
        tipoProducto,
        consumible,
        idLote,
      });
      await producto.save();

      const lote = await Lote.findById(producto.idLote);
      producto.idLote = lote;

      res.json(producto);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        codigo,
        nombre,
        descripcion,
        unidadMedida,
        precioUnitario,
        iva,
        tipoProducto,
        consumible,
        idLote,
      } = req.body;
      const producto = await Producto.findByIdAndUpdate(
        id,
        {
          codigo,
          nombre: await helpersGeneral.primeraMayuscula(nombre),
          descripcion,
          unidadMedida,
          precioUnitario,
          iva,
          tipoProducto,
          consumible,
          idLote,
        },
        { new: true }
      );

      const lote = await Lote.findById(producto.idLote);
      producto.idLote = lote;

      res.json(producto);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Producto.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );

      const lote = await Lote.findById(producto.idLote);
      producto.idLote = lote;

      res.json(producto);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Producto.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );

      const lote = await Lote.findById(producto.idLote);
      producto.idLote = lote;

      res.json(producto);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpProducto;
