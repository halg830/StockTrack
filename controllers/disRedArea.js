import DisRedArea from "../models/disRedArea.js";

const httpDisRedArea = {
  // Get
  getAll: async (req, res) => {
    try {
      const disRedAreas = await DisRedArea.find()
        .populate({ path: "idDisDependenciaRed", populate: [{ path: "idDependencia" }, { path: "idRed" }] })
        .populate("idAreaTematica");
      res.json(disRedAreas);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const disRedArea = await DisRedArea.findById(id)
      .populate({ path: "idDisDependenciaRed", populate: [{ path: "idDependencia" }, { path: "idRed" }] })
      .populate("idAreaTematica");
      res.json(disRedArea);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getByIdDistribucion: async (req, res)=>{
    try {
      const { idDisDependenciaRed } = req.params

      const disRedArea = await DisRedArea.find({idDisDependenciaRed})
      .populate({ path: "idDisDependenciaRed", populate: [{ path: "idDependencia" }, { path: "idRed" }] })
      .populate("idAreaTematica");
      res.json(disRedArea);
    } catch (error) {
      res.status(400).json({error})
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { presupuestoAsignado, idDisDependenciaRed,idAreaTematica ,year } = req.body;
      const disRedArea = new DisRedArea({
        presupuestoAsignado,
        presupuestoDisponible:presupuestoAsignado,
        idDisDependenciaRed,
        idAreaTematica,
        year
      });
      await disRedArea.save();
      res.json(disRedArea);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const {  presupuestoAsignado, idDisDependenciaRed,idAreaTematica ,year} = req.body;
      const disRedArea = await DisRedArea.findByIdAndUpdate(
        id,
        {  presupuestoAsignado, idDisDependenciaRed,idAreaTematica ,year },
        { new: true }
      );
      res.json(disRedArea);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  // putEditar: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { presupuestoAsignado, idDisDependenciaRed, idAreaTematica, year } = req.body;

  //     const disAreaDestino = await DisAreaDestino.find({
  //       idDisAreaDestino: id
  //     });

  //     const totalPresupuestos = disAreaDestino.reduce((total, disAreaDestino) => {
  //       return total + disAreaDestino.presupuesto;
  //     }, 0);

  //     const presupuestoDisponible = presupuesto - totalPresupuestos;

  //     const distribucion = await DisRedArea.findByIdAndUpdate(
  //       id,
  //       {
  //         presupuestoAsignado,
  //         presupuestoDisponible,
  //         idDisDependenciaRed,
  //         idAreaTematica,
  //         year
  //       }, { new: true }
  //     ).populate({ path: "idDisDependenciaRed", populate: [{ path: "idDependencia" }, { path: "idRed" }] })
  //     .populate("idAreaTematica");
  //     res.json(distribucion);
  //   } catch (error) {
  //     res.status(400).json({ error });
  //   }
  // },

  putAjustarPresupuesto: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuestoAsignado } = req.body;

      const disRedArea = await DisRedArea.findById(id)
      const presupuestoDisponible = disRedArea.presupuestoDisponible - presupuestoAsignado

      const updatedDisRedArea = await DisRedArea.findByIdAndUpdate(id,
        { presupuestoDisponible },
        { new: true }
      );

      res.json(updatedDisRedArea);

    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disRedArea = await DisRedArea.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      ).populate({ path: "idDisDependenciaRed", populate: [{ path: "idDependencia" }, { path: "idRed" }] })
      .populate("idAreaTematica");

      res.json(disRedArea);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disRedArea = await DisRedArea.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      )
      .populate({ path: "idDisDependenciaRed", populate: [{ path: "idDependencia" }, { path: "idRed" }] })
      .populate("idAreaTematica");
      res.json(disRedArea);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};

export default httpDisRedArea;
