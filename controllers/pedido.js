import Pedido from "../models/pedido";

// Función para crear un nuevo pedido
export const crearPedido = async (req, res) => {
  try {
    const nuevoPedido = new Pedido(req.body);
    const pedidoGuardado = await nuevoPedido.save();
    res.status(201).json(pedidoGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Función para obtener todos los pedidos
export const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Función para obtener un pedido por su ID
export const obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Función para actualizar un pedido por su ID
export const actualizarPedido = async (req, res) => {
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
};

// Función para eliminar un pedido por su ID
export const eliminarPedido = async (req, res) => {
  try {
    const pedidoEliminado = await Pedido.findByIdAndRemove(req.params.id);
    if (!pedidoEliminado) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }
    res.json({ mensaje: "Pedido eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
