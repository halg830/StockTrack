import Producto from "../models/producto.js";

const httpProducto = {
  getAll: async (req, res) => {
    try {
      const producto = await Producto.find();
      res.json(producto);
    } catch (error) {
      res.status(400).json({ error });
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
      res.status(400).json({ error });
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
      } = req.body;
      const producto = new Producto({
        codigo,
        nombre,
        descripcion,
        unidadMedida,
        precioUnitario,
        iva,
        tipoProducto,
        consumible,
      });
      await producto.save();

      res.json(producto);
    } catch (error) {
      res.status(400).json({ error });
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
      } = req.body;
      const producto = await Producto.findByIdAndUpdate(
        id,
        {
          codigo,
          nombre,
          descripcion,
          unidadMedida,
          precioUnitario,
          iva,
          tipoProducto,
          consumible,
        },
        { new: true }
      );
      res.json(producto);
    } catch (error) {
      res.status(400).json({ error });
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
      res.json(producto);
    } catch (error) {
      res.status(400).json({ error });
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
      res.json(producto);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};

export default httpProducto;
