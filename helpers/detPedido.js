import DetPedido from "../models/detallePedido.js";

const helpersDetPedido = {
  existeId: async (id, req) => {
    const detPedido = await DetPedido.findById(id);
    if (!detPedido) {
      throw new Error(`Detalle de pedido no encontrado`);
    }

    req.DetPedidoUpdate = detPedido;
  },
};

export default helpersDetPedido;
