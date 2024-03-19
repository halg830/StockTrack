import Pedido from "../models/pedido.js";
import DetPedido from '../models/detallePedido.js';

const httpPedido = {
  getAll: async (req, res) => {
    try {
      const pedidos = await Pedido.find().populate("idDestino").populate("idInstructorEncargado");

      const detPedidos = pedidos.map(async (e) => {
        e.detPedido= await DetPedido.find({idPedido:e._id});
      });

      await Promise.all(detPedidos);

      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPorId: async (req, res) => {
    try {
      const pedido = await Pedido.findById(req.params.id).populate("idDestino").populate("idInstructorEncargado");
      if (!pedido) {
        return res.status(404).json({ mensaje: "Pedido no encontrado" });
      }
      res.json(pedido);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getNumero: async (req, res) => {
    try {
      const ultimoPedido = await Pedido.findOne().sort({ numero: -1 });    
      console.log(ultimoPedido);
      let numero = ultimoPedido ? ultimoPedido.numero : 0;
      numero+=1
      res.json(numero)       
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  post: async (req, res) => {
    try {
      const {idInstructorEncargado, idDestino, total} = req.body;

      const ultimoPedido = await Pedido.findOne().sort({ numero: -1 });    
      console.log(ultimoPedido);
      let numero = ultimoPedido ? ultimoPedido.numero : 0;
      numero+=1

      console.log(numero);

      const nuevoPedido = new Pedido({idInstructorEncargado, idDestino, total, numero});
      const pedidoGuardado = await nuevoPedido.save();
      res.status(201).json(pedidoGuardado);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
