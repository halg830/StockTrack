import DisContratoLote from "../models/disContratoLote.js";
import Contrato from "../models/contrato.js";
import DisLoteDependencia from "../models/disLoteDependencia.js";

const httpDisContratoLote = {
  getAll: async (req, res) => {
    try {
      const distribucion = await DisContratoLote.find()
        .populate("idContrato")
        .populate("idLote");
        console.log(distribucion);
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DisContratoLote.findById(id)
        .populate("idContrato")
        .populate("idLote");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getDistribucionesById: async (req, res) => {
    try {
      const { idContrato } = req.params;
      const distribucion = await DisContratoLote.find({idContrato})
        .populate("idContrato")
        .populate("idLote");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { presupuestoAsignado, idContrato, idLote } = req.body;

      const distribucion = new DisContratoLote({
        presupuestoAsignado,
        presupuestoDisponible: presupuestoAsignado,
        idContrato,
        idLote,
        
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
  //     const { presupuestoAsignado, idContrato, idLote } = req.body;

  //     const distribucion = await DisContratoLote.findByIdAndUpdate(
  //       id,
  //       {
  //         presupuestoAsignado,
  //         presupuestoDisponible:presupuestoAsignado,
  //         idContrato,
  //         idLote,
  //       },
  //       { new: true }
  //     )
  //       .populate("idContrato")
  //       .populate("idLote");
  //     res.json(distribucion);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: "Error en el servidor" });
  //   }
  // },

  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuestoAsignado, idContrato, idLote } = req.body;

      const disAreaDestino = await DisLoteDependencia.find({
        idDisContratoLote: id
      });

      const disContrato = await Contrato.findOne({
        _id:idContrato
      })

      const presupuestoDisponibleContrato = disContrato.presupuestoDisponible 


      const totalPresupuestos = disAreaDestino.reduce((total, disAreaDestino) => {
        return total + disAreaDestino.presupuestoAsignado;
      }, 0);

      const distribucionAnterior = await DisContratoLote.findById(id);
      const presupuestoAnterior = distribucionAnterior.presupuestoAsignado;


      const diferencia = presupuestoAnterior - presupuestoAsignado;

      const presupuestoDisponible = presupuestoAsignado - totalPresupuestos;

      if (presupuestoDisponible < 0) {
        return res.status(400).json({ message: 'El nuevo presupuesto es menor que la cantidad ya distribuida.' });
      } 
      
      const updatePresupuestoRed = presupuestoDisponibleContrato + diferencia

      const presupuestoRed = await Contrato.findByIdAndUpdate(idContrato, {
      presupuestoDisponible: updatePresupuestoRed}, { new: true } );

      if(!presupuestoRed){
         res.status(200).json({ message: 'La red no tiene ningun presupuesto' });
      };

      const distribucion = await DisContratoLote.findByIdAndUpdate(
        id,
        {
          presupuestoAsignado, presupuestoDisponible, idContrato, idLote
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
      
      const disContratoLote = await DisContratoLote.findById(id)
      const presupuestoDisponible = disContratoLote.presupuestoDisponible - presupuestoAsignado

      const newPresupuesto = await DisContratoLote.findByIdAndUpdate(
        id,
        { presupuestoDisponible },
        { new: true }
      )
        .populate("idContrato")
        .populate("idLote");

      res.json(newPresupuesto);

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependencia = await DisContratoLote.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      )
      .populate("idContrato")
      .populate("idLote");
      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependencia = await DisContratoLote.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      )
      .populate("idContrato")
      .populate("idLote");
      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpDisContratoLote;
