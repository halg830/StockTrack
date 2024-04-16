import DisLoteDependencia from "../models/disLoteDependencia.js";
import DisContratoLote from "../models/disContratoLote.js";
import DisDependenciaRed from "../models/disDependenciaRed.js";
import disLoteDependencia from "../models/disLoteDependencia.js";


const httpDisLoteDependencia = {
  getAll: async (req, res) => {
    try {
      const distribucion = await DisLoteDependencia.find()
      .populate({ path: "idDisContratoLote", populate: [{ path: "idContrato" }, { path: "idLote" }] })
        .populate("idDependencia");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DisLoteDependencia.findById(id)
        .populate({ path: "idDisContratoLote", populate: [{ path: "idContrato" }, { path: "idLote" }] })
        .populate("idDependencia");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  getDistribucionesById: async (req, res) => {
    try {
      const { idDependencia } = req.params;
      const distribucion = await DisLoteDependencia.find({idDependencia})
        .populate({ path: "idDisContratoLote", populate: [{ path: "idContrato" }, { path: "idLote" }] })
        .populate("idDependencia");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { presupuestoAsignado, idDisContratoLote, idDependencia } = req.body;

      const distribucion = new DisLoteDependencia({
        presupuestoAsignado,
        presupuestoDisponible: presupuestoAsignado,
        idDisContratoLote,
        idDependencia,
      });
      await distribucion.save();

      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Put
  // putEditar: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { presupuestoAsignado, idDisContratoLote, idDependencia } = req.body;

  //     const distribucion = await DisLoteDependencia.findByIdAndUpdate(
  //       id,
  //       {
  //         presupuestoAsignado,
  //         presupuestoDisponible:presupuestoAsignado,
  //         idDisContratoLote,
  //         idDependencia,
  //       },
  //       { new: true }
  //     )
  //       .populate({ path: "idDisContratoLote", populate: [{ path: "idContrato" }, { path: "idLote" }] })
  //       .populate("idDependencia");
  //     res.json(distribucion);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: "Error en el servidor" });
  //   }
  // },
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuestoAsignado, idDisContratoLote, idDependencia  } = req.body;

      const disAreaDestino = await DisDependenciaRed.find({
        idDisDependencia: id
      });

      const disContratoLote = await DisContratoLote.findOne({
        _id:idDisContratoLote
      })

      const presupuestoDisponibleContrato = disContratoLote.presupuestoDisponible 


      const totalPresupuestos = disAreaDestino.reduce((total, disAreaDestino) => {
        return total + disAreaDestino.presupuestoAsignado;
      }, 0);

      const distribucionAnterior = await disLoteDependencia.findById(id);
      const presupuestoAnterior = distribucionAnterior.presupuestoAsignado;


      const diferencia = presupuestoAnterior - presupuestoAsignado;

      const presupuestoDisponible = presupuestoAsignado - totalPresupuestos;

      if (presupuestoDisponible < 0) {
        return res.status(400).json({ message: 'El nuevo presupuesto es menor que la cantidad ya distribuida.' });
      } 
      
      const updatePresupuestoRed = presupuestoDisponibleContrato + diferencia

      const presupuestoRed = await DisContratoLote.findByIdAndUpdate(idDisContratoLote, {
      presupuestoDisponible: updatePresupuestoRed}, { new: true } );

      if(!presupuestoRed){
         res.status(200).json({ message: 'La red no tiene ningun presupuesto' });
      };

      const distribucion = await DisLoteDependencia.findByIdAndUpdate(
        id,
        {
          presupuestoAsignado, presupuestoDisponible, idDisContratoLote, idDependencia 
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

      const disLoteDependencia = await DisLoteDependencia.findById(id)
      const presupuestoDisponible = disLoteDependencia.presupuestoDisponible - presupuestoAsignado

      const distribucion = await DisLoteDependencia.findByIdAndUpdate(
        id,
        { presupuestoDisponible },
        { new: true }
      )
        .populate({ path: "idDisContratoLote", populate: [{ path: "idContrato" }, { path: "idLote" }] })
        .populate("idDependencia");

      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DisLoteDependencia.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      )
      .populate({ path: "idDisContratoLote", populate: [{ path: "idContrato" }, { path: "idLote" }] })
      .populate("idDependencia");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DisLoteDependencia.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      )
      .populate({ path: "idDisContratoLote", populate: [{ path: "idContrato" }, { path: "idLote" }] })
      .populate("idDependencia");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpDisLoteDependencia;
