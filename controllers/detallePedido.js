import DetallePedido from "../models/detallePedido.js";

const httpDetallePedido = {
  getAll: async (req, res) => {
    try {
      const detallePedido = await DetallePedido.find()
        .populate("idPedido")
        .populate("idProducto");

      res.json(detallePedido);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const detallePedido = await DetallePedido.findById({ id })
        .populate("idPedido")
        .populate("idProducto");

      res.json(detallePedido);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getByPedido: async (req, res) => {
    try {
      const { idPedido } = req.params;
      const pedidos = await DetallePedido.find({ idPedido })
        .populate("idPedido")
        .populate("idProducto");
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  post: async (req, res) => {
    try {
      const { numero, cantidad, idPedido, idProducto, subTotal } = req.body;
      const detallePedido = new DetallePedido({
        numero,
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
      const { numero, cantidad, idPedido, idProducto, subTotal } = req.body;
      const detallePedido = await DetallePedido.findByIdAndUpdate(
        id,
        { numero, cantidad, idPedido, idProducto, subTotal },
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
