import Pedido from "../models/pedido.js";

const httpPedido = {
  getAll: async (req, res) => {
    try {
      const pedidos = await Pedido.find().populate("idFicha").populate("idInstructorEncargado");
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPorId: async (req, res) => {
    try {
      const pedido = await Pedido.findById(req.params.id).populate("idFicha").populate("idInstructorEncargado");
      if (!pedido) {
        return res.status(404).json({ mensaje: "Pedido no encontrado" });
      }
      res.json(pedido);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  post: async (req, res) => {
    try {
      const nuevoPedido = new Pedido(req.body);
      const pedidoGuardado = await nuevoPedido.save();
      res.status(201).json(pedidoGuardado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  putEditar: async (req, res) => {
    try {
      const pedidoActualizado = await Pedido.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!pedidoActualizado) {
        return res.status(404).json({ mensaje: "Pedido no encontrado" });
      }
      res.json(pedidoActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default httpPedido
