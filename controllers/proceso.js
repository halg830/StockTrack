import Proceso from "../models/proceso.js";
import Contrato from "../models/contrato.js";

const httpProceso = {
  getAll: async (req, res) => {
    try {
      const proceso = await Proceso.find()
      res.json(proceso);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getProcesoById: async (req, res) => {
    try {
      const { id } = req.params;
      const proceso = await Proceso.findById(id)
      res.json(proceso);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { presupuestoAsignado, codigo } = req.body;

      const proceso = new Proceso({
        presupuestoAsignado,
        presupuestoDisponible: presupuestoAsignado,
        codigo,
      });
      await proceso.save();

      res.json(proceso);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Put
  // putEditar: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { presupuestoAsignado, codigo } = req.body;

  //     const proceso = await Proceso.findByIdAndUpdate(
  //       id,
  //       {
  //         presupuestoAsignado,
  //         presupuestoDisponible: presupuestoAsignado,
  //         codigo,
  //       },
  //       { new: true }
  //     )
  //     res.json(proceso);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: "Error en el servidor" });
  //   }
  // },
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuestoAsignado, codigo } = req.body;

      const disContrato = await Contrato.find({
        idProceso: id
      });

      const totalPresupuestos = disContrato.reduce((total, disContrato) => {
        return total + disContrato.presupuestoAsignado;
      }, 0);

      const presupuestoDisponible = presupuestoAsignado - totalPresupuestos;

      if (presupuestoDisponible < 0) {
        return res.status(400).json({ message: 'El nuevo presupuesto es menor que la cantidad ya distribuida.' });
      } 
      
      const distribucion = await Proceso.findByIdAndUpdate(
        id,
        {
          presupuestoAsignado,
          presupuestoDisponible,
          codigo,
        }, { new: true }
      );
      res.json(distribucion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putAjustarPresupuesto: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuestoAsignado } = req.body;

      const proceso = await Proceso.findById(id);
      const presupuestoDisponible =
        proceso.presupuestoDisponible - presupuestoAsignado;

      const procesoUpdate = await Proceso.findByIdAndUpdate(
        id,
        { presupuestoDisponible },
        { new: true }
      )

      res.json(procesoUpdate);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const proceso = await Proceso.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      )
      res.json(proceso);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const proceso = await Proceso.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      )
      res.json(proceso);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpProceso;
