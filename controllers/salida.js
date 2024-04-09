import Salida from "../models/salida.js";
import DetSalida from '../models/detSalida.js';

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
      
      const detallesSalida = detSalidas.map(async(detSalida) => {
        const buscarDetPedido = detPedido.find(det=> det.idProducto._id === detSalida.idProducto._id)
        
        const cantidadPendiente = buscarDetPedido.cantidad - detSalida.cantidad
        const subTotal = detSalida.cantidad*detSalida.idProducto.precioUnitario
      
        const nuevoDetSalida = new DetSalida({cantidadEntregada: detSalida.cantidad, cantidadPendiente, idSalida: salidaGuardado._id, idProducto: detSalida.idProducto, subTotal })
        await nuevoDetSalida.save()
        console.log(nuevoDetSalida);
      });

      await Promise.all(detallesSalida);

      res.status(201).json(salidaGuardado);
    } catch (error) {
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
      const producto = await Producto.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );

      const lote = await Lote.findById(producto.idLote);
      producto.idLote = lote;

      res.json(producto);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Producto.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );

      const lote = await Lote.findById(producto.idLote);
      producto.idLote = lote;

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
