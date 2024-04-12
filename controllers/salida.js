import Salida from "../models/salida.js";
import DetSalida from '../models/detSalida.js';
import Pedido from '../models/pedido.js'

const httpSalida = {
  getAll: async (req, res) => {
    try {
      const salidas = await Salida.find().populate({ path: 'idPedido', populate: { path: 'idDestino' } }) // Populate idPedido con idDestino
      .populate({ path: 'idPedido', populate: { path: 'idInstructorEncargado' } }) // Populate idPedido con idInstructorEncargado
      .populate("idAdmin");

      const detSalidas = salidas.map(async (e) => {
        e.detSalida= await DetSalida.find({idPedido:e._id});
      });

      await Promise.all(detSalidas);

      res.json(salidas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPorId: async (req, res) => {
    try {
      const salida = await Salida.findById(req.params.id).populate("idPedido").populate("idAdmin");
      if (!salida) {
        return res.status(404).json({ mensaje: "Salida no encontrada" });
      }
      res.json(salida);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getNumero: async (req, res) => {
    try {
      const ultimoSalida = await Salida.findOne().sort({ numero: -1 });    
      console.log(ultimoSalida);
      let numero = ultimoSalida ? ultimoSalida.numero : 0;
      numero+=1
      res.json(numero)       
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  post: async (req, res) => {
    try {
      const {idAdmin, idPedido, fechaEntrega, entregado, total, detSalidas, detPedido} = req.body;

      const ultimoSalida = await Salida.findOne().sort({ numero: -1 });    
      console.log(ultimoSalida);
      let numero = ultimoSalida ? ultimoSalida.numero : 0;
      numero+=1

      console.log(numero);
      const nuevoSalida = new Salida({idAdmin, idPedido, fechaEntrega, total, entregado, numero});
      const salidaGuardado = await nuevoSalida.save();
      
      console.log(detSalidas, detPedido);
      
      const detallesSalida = detPedido.map(async(det) => {
        const buscarDetSalida = detSalidas.find(detS=> detS.idProducto._id === det.idProducto._id)
        
        let cantidadEntregada = 0
        let cantidadPendiente = det.cantidad
        let subTotal = 0
        if(buscarDetSalida) {
          cantidadEntregada = buscarDetSalida.cantidad
          cantidadPendiente = det.cantidad - buscarDetSalida.cantidad
          if(cantidadPendiente<0) return res.status(400).json({error: 'Se está entregando más de lo que se pidio'})
          subTotal = buscarDetSalida.cantidad*det.idProducto.precioUnitario

        }

      
        const nuevoDetSalida = new DetSalida({cantidadEntregada, cantidadPendiente, idSalida: salidaGuardado._id, idProducto: det.idProducto._id, subTotal })
        await nuevoDetSalida.save()
        console.log(nuevoDetSalida);
      });

      await Promise.all(detallesSalida);

      await Pedido.findByIdAndUpdate(idPedido, {estado: true}, {new: true})

      res.status(201).json(salidaGuardado);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },

  putEditar: async (req, res) => {
    try {
      const salidaActualizado = await Salida.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!salidaActualizado) {
        return res.status(404).json({ mensaje: "Salida no encontrado" });
      }
      res.json(salidaActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Salida.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );

      res.json(producto);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Salida.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );

      res.json(producto);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putEntregado: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Salida.findByIdAndUpdate(
        id,
        { entregado: 1 },
        { new: true }
      ).populate({ path: 'idPedido', populate: { path: 'idDestino' } }) // Populate idPedido con idDestino
      .populate({ path: 'idPedido', populate: { path: 'idInstructorEncargado' } }) // Populate idPedido con idInstructorEncargado
      .populate("idAdmin");

      res.json(producto);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putNoEntregado: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Salida.findByIdAndUpdate(
        id,
        { entregado: 0 },
        { new: true }
      ).populate({ path: 'idPedido', populate: { path: 'idDestino' } }) // Populate idPedido con idDestino
      .populate({ path: 'idPedido', populate: { path: 'idInstructorEncargado' } }) // Populate idPedido con idInstructorEncargado
      .populate("idAdmin");

      res.json(producto);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
}

export default httpSalida
