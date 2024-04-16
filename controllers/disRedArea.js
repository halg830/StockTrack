import DisRedArea from "../models/disRedArea.js";
import DisAreaDestino from "../models/disAreaDestino.js";
import DisDependenciaRed from "../models/disDependenciaRed.js"

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
      .populate({ path: "idDisDependenciaRed", populate: [{ path: "idDisDependencia" }, { path: "idRed" }] })
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
      .populate({ path: "idDisDependenciaRed", populate: [{ path: "idDisDependencia" }, { path: "idRed" }] })
      .populate("idAreaTematica");
      res.json(disRedArea);
    } catch (error) {
      res.status(400).json({error})
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { presupuestoAsignado, idDisDependenciaRed,idAreaTematica } = req.body;
      const disRedArea = new DisRedArea({
        presupuestoAsignado,
        presupuestoDisponible:presupuestoAsignado,
        idDisDependenciaRed,
        idAreaTematica,
      });
      await disRedArea.save();
      res.json(disRedArea);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put
  // putEditar: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const {  presupuestoAsignado, idDisDependenciaRed,idAreaTematica} = req.body;
  //     const disRedArea = await DisRedArea.findByIdAndUpdate(
  //       id,
  //       {  presupuestoAsignado, idDisDependenciaRed,idAreaTematica},
  //       { new: true }
  //     );
  //     res.json(disRedArea);
  //   } catch (error) {
  //     res.status(400).json({ error });
  //   }
  // },
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuestoAsignado, idDisDependenciaRed, idAreaTematica } = req.body;

      const disAreaDestino = await DisAreaDestino.find({
        idDisRedArea: id
      });

      const disDependenciaRed = await DisDependenciaRed.findOne({
        _id:idDisDependenciaRed
      })

      const presupuestoDisponibleDependenciaRed = disDependenciaRed.presupuestoDisponible 


      const totalPresupuestos = disAreaDestino.reduce((total, disAreaDestino) => {
        return total + disAreaDestino.presupuestoAsignado;
      }, 0);

      const distribucionAnterior = await DisRedArea.findById(id);
      const presupuestoAnterior = distribucionAnterior.presupuestoAsignado;


      const diferencia = presupuestoAnterior - presupuestoAsignado;

      const presupuestoDisponible = presupuestoAsignado - totalPresupuestos;

      if (presupuestoDisponible < 0) {
        return res.status(400).json({ message: 'El nuevo presupuesto es menor que la cantidad ya distribuida.' });
      } 
      
      const updatePresupuestoRed = presupuestoDisponibleDependenciaRed + diferencia

      const presupuestoRed = await DisDependenciaRed.findByIdAndUpdate(idDisDependenciaRed, {
      presupuestoDisponible: updatePresupuestoRed}, { new: true } );

      if(!presupuestoRed){
         res.status(200).json({ message: 'La red no tiene ningun presupuesto' });
      };

      const distribucion = await DisRedArea.findByIdAndUpdate(
        id,
        {
          presupuestoAsignado,
          presupuestoDisponible,
          idDisDependenciaRed,
          idAreaTematica,
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

      const disRedArea = await DisRedArea.findById(id)
      const presupuestoDisponible = disRedArea.presupuestoDisponible - presupuestoAsignado

      const updatedDisRedArea = await DisRedArea.findByIdAndUpdate(id,
        { presupuestoDisponible },
        { new: true }
      )

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
      )     .populate({ path: "idDisDependenciaRed", populate: [{ path: "idDisDependencia" }, { path: "idRed" }] })
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
      .populate({ path: "idDisDependenciaRed", populate: [{ path: "idDisDependencia" }, { path: "idRed" }] })
      .populate("idAreaTematica");
      res.json(disRedArea);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};

export default httpDisRedArea;
