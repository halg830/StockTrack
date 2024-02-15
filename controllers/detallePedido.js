import DetallePedido from "../models/detallePedido.js";

const httpDetallePedido = {
  getAll: async (req, res) => {
    try {
      const detallePedido = await DetallePedido.find();

      res.json(detallePedido);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const detallePedido = await DetallePedido.findById({ id });

      res.json(detallePedido);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  post: async (req, res) => {
    try {
      const {
        cantidad,
        idPedido,
        idProducto,
        subTotal,
      } = req.body;
      const detallePedido = new DetallePedido({
        cantidad,
        idPedido,
        idProducto,
        subTotal,
      });
      await detallePedido.save();
      res.json(detallePedido);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        cantidad,
        idPedido,
        idProducto,
        subTotal,
      } = req.body;
      const detallePedido = await DetallePedido.findByIdAndUpdate(
        id,
        { cantidad, idPedido, idProducto, subTotal },
        { new: true }
      );
      res.json(detallePedido);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const detallePedido = await DetallePedido.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );
      res.json(detallePedido);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const detallePedido = await DetallePedido.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );
      res.json(detallePedido);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
export default httpDetallePedido;
