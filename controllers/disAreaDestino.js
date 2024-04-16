import DisAreaDestino from "../models/disAreaDestino.js";
import DisRedArea from "../models/disRedArea.js";

const httpDisAreaDestino = {
  getAll: async (req, res) => {
    try {
      const distribucion = await DisAreaDestino.find()
        .populate("idDisRedArea")
        .populate("idDestino");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getDistribucionesById: async (req, res) => {
    try {
      const { idDisRedArea } = req.params;
      const distribucion = await DisAreaDestino.find({idDisRedArea})
        .populate({path:"idDisRedArea",populate: [{ path: "idAreaTematica"}]})
        .populate("idDestino");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { presupuestoAsignado, idDisRedArea, idDestino} = req.body;

      const distribucion = new DisAreaDestino({
        presupuestoAsignado,
        presupuestoDisponible: presupuestoAsignado,
        idDisRedArea,
        idDestino,
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
  //     const { presupuestoAsignado, idDisRedArea, idDestino} = req.body;

  //     const distribucion = await DisAreaDestino.findByIdAndUpdate(
  //       id,
  //       {
  //         presupuestoAsignado,
  //         idDisRedArea,
  //         idDestino,
  //       },
  //       { new: true }
  //     )
  //       .populate("idDisRedArea")
  //       .populate("idDestino");
  //     res.json(distribucion);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: "Error en el servidor" });
  //   }
  // },

  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const {presupuestoAsignado, idDisRedArea, idDestino } = req.body;

      const disRedArea = await DisRedArea.findOne({
        _id:idDisRedArea
      })

      const presupuestoDisponibleRedArea = disRedArea.presupuestoDisponible 

      const distribucionAnterior = await DisAreaDestino.findById(id);
      const presupuestoAnterior = distribucionAnterior.presupuestoAsignado;


      const diferencia = presupuestoAnterior - presupuestoAsignado;


      if (presupuestoDisponible < 0) {
        return res.status(400).json({ message: 'El nuevo presupuesto es menor que la cantidad ya distribuida.' });
      } 
      
      const updatePresupuestoRed = presupuestoDisponibleRedArea + diferencia

      const presupuestoRed = await disRedArea.findByIdAndUpdate(idDisRedArea, {
      presupuestoDisponible: updatePresupuestoRed}, { new: true } );

      if(!presupuestoRed){
         res.status(200).json({ message: 'La red no tiene ningun presupuesto' });
      };

      const distribucion = await DisRedArea.findByIdAndUpdate(
        id,
        {
          presupuestoAsignado,
          presupuestoDisponible:presupuestoAsignado,
          idDisRedArea,
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

      const disAreaDestino = await DisAreaDestino.findById(id)
      const presupuestoDisponible = disAreaDestino.presupuestoDisponible - presupuestoAsignado

      const disDependencia = await DisAreaDestino.findByIdAndUpdate(
        id,
        { presupuestoDisponible },
        { new: true }
      )
        .populate("idDisRedArea")
        .populate("idDestino");

      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependencia = await DisAreaDestino.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      ).populate("idDisRedArea");
      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependencia = await DisAreaDestino.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      ).populate("idDisRedArea");
      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpDisAreaDestino;
