import DisDependenciaRed from "../models/disDependenciaRed.js";
import RedConocimiento from "../models/redConocimineto.js";
import DisLoteDependencia from "../models/disLoteDependencia.js";
import DisRedArea from "../models/disRedArea.js"

const httpDisDependenciaRed = {

  getAll: async (req, res) => {
    try {
      const distribucion = await DisDependenciaRed.find()
      .populate({ path: "idDisDependencia", populate: [{ path: "idDependencia" }] })
      .populate("idRed");
      res.json(distribucion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getDistribucionesById: async (req, res) => {
    try {
      const { idDisDependencia } = req.params;
      const distribucion = await DisDependenciaRed.find({ idDisDependencia })
      .populate({ path: "idDisDependencia", populate: [{ path: "idDependencia" }] })
        .populate("idRed");
      res.json(distribucion)
    } catch (error) {
      res.status(400).json({ error });

    }
  },

  getDistribucionById: async (req, res) => {
    try {
      const { id } = req.params;

      const distribucion = await DisDependenciaRed.findById(id)
      .populate({ path: "idDisDependencia", populate: [{ path: "idDependencia" }] })
      .populate("idRed");
      res.json(distribucion)
    } catch (error) {
      res.status(400).json({ error });

    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { presupuestoAsignado, idDisDependencia, idRed} = req.body;

      const distribucion = new DisDependenciaRed({
        presupuestoAsignado,
        presupuestoDisponible: presupuestoAsignado,
        idDisDependencia,
        idRed,
      });
      await distribucion.save();

      const red = await RedConocimiento.findById(distribucion.idRed);
      distribucion.idRed = red;

      const dependencia = await DisDependencia.findById(distribucion.idDisDependencia);
      distribucion.idDisDependencia = dependencia


      res.json(distribucion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put
  // putEditar: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { presupuestoAsignado, idDisDependencia, idRed, } = req.body;

  //     // const disRedArea = await DisRedArea.find({
  //     //   idDisDependenciaRed: id
  //     // });

  //     // const totalPresupuestos = disRedArea.reduce((total, disRedArea) => {
  //     //   return total + disRedArea.presupuesto;
  //     // }, 0);

  //     // const presupuestoDisponible = presupuesto - totalPresupuestos;

  //     const distribucion = await DisDependenciaRed.findByIdAndUpdate(
  //       id,
  //       {
  //         presupuestoAsignado,
  //         presupuestoDisponible:presupuestoAsignado,
  //         idDisDependencia,
  //         idRed,
  //       }, { new: true }
  //     ).populate({ path: "idDisDependencia", populate: [{ path: "idDependencia" }] })
  //     .populate("idRed");
  //     res.json(distribucion);
  //   } catch (error) {
  //     res.status(400).json({ error });
  //   }
  // },
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuestoAsignado, idDisDependencia, idRed } = req.body;

      const disRedArea = await idDisRedArea.find({
        idDisRedArea: id
      });

      const disLoteDependencia = await DisLoteDependencia.findOne({
        _id:idDisDependencia
      })

      const presupuestoDisponibleDependenciaRed = disLoteDependencia.presupuestoDisponible 


      const totalPresupuestos = disRedArea.reduce((total, disRedArea) => {
        return total + disRedArea.presupuestoAsignado;
      }, 0);

      const distribucionAnterior = await DisDependenciaRed.findById(id);
      const presupuestoAnterior = distribucionAnterior.presupuestoAsignado;


      const diferencia = presupuestoAnterior - presupuestoAsignado;

      const presupuestoDisponible = presupuestoAsignado - totalPresupuestos;

      if (presupuestoDisponible < 0) {
        return res.status(400).json({ message: 'El nuevo presupuesto es menor que la cantidad ya distribuida.' });
      } 
      
      const updatePresupuestoRed = presupuestoDisponibleDependenciaRed + diferencia

      const presupuestoRed = await disLoteDependencia.findByIdAndUpdate(idDisDependencia, {
      presupuestoDisponible: updatePresupuestoRed}, { new: true } );

      if(!presupuestoRed){
         res.status(200).json({ message: 'La red no tiene ningun presupuesto' });
      };

      const distribucion = await DisRedArea.findByIdAndUpdate(
        id,
        {
          presupuestoAsignado,presupuestoDisponible, idDisDependencia, idRed
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

      const disDependenciaRed = await DisDependenciaRed.findById(id)
      const presupuestoDisponible = disDependenciaRed.presupuestoDisponible - presupuestoAsignado

      const updatedDisDependenciaRed = await DisDependenciaRed.findByIdAndUpdate(id,
        { presupuestoDisponible },
        { new: true }
      );

      res.json(updatedDisDependenciaRed);

    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependenciaRed = await DisDependenciaRed.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      ).populate({ path: "idDisDependencia", populate: [{ path: "idDependencia" }] })
      .populate("idRed");
      res.json(disDependenciaRed);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependenciaRed = await DisDependenciaRed.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      ).populate({ path: "idDisDependencia", populate: [{ path: "idDependencia" }] })
      .populate("idRed");
      res.json(disDependenciaRed);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
export default httpDisDependenciaRed;
