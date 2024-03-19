import Destino from "../models/destino.js";

const helpersFicha = {
  existeId: async (id, req) => {
    const destino = await Destino.findById(id);
    if (!destino) {
      throw new Error(`Destino no encontrado`);
    }

    req.FichaUpdate = destino;
  },

  validarFechas: async (fechaInicio, req) => {
    const fechaActual = new Date();
    const fechaFin = req.req.body.fechaFin;

    if (fechaInicio <= fechaActual) {
      throw new Error("La fecha de inicio debe ser mayor que la fecha actual");
    }
    if (fechaFin <= fechaInicio) {
      throw new Error("La fecha de fin debe ser mayor a la de inicio");
    }
  },
  validarFichaUnica: async (codigo) => {
    const existe = await Destino.findOne({ codigo });

    if (existe) {
      throw new Error("El destino ya esta registrado");
    }
  },
  validarFichaUnicaEditar: async (id, codigo) => {
    try {
      const fichaExiste = await Destino.findOne({
        codigo,
        _id: { $ne: id },
      });

      if (fichaExiste) {
        throw new Error("Ya existe un destino con este codigo");
      }

      return true;
    } catch (error) {
      throw error;
    }
  },
};
export default helpersFicha;
