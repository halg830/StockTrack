import DetSalida from "../models/detSalida.js";

const helpersDetSalida = {
  existeId: async (id, req) => {
    const detSalida = await DetSalida.findById(id);
    if (!detSalida) {
      throw new Error(`Detalle de pedido no encontrado`);
    }

    req.DetSalidaUpdate = detSalida;
  },
};

export default helpersDetSalida;
