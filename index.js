import express from 'express';
import "dotenv/config"
import mongoose from 'mongoose'
import http from 'http';
import cors from 'cors'
import bodyParser from 'body-parser';
import area from "./routes/area.js"
import contrato from './routes/contrato.js'
import dependencia from './routes/dependencia.js'
import destino from './routes/destino.js'
import detallePedido from "./routes/detallePedido.js"
import detSalida from './routes/detSalida.js'
import disAreaDestino from './routes/disAreaDestino.js'
import disContratoLote from './routes/disContratoLote.js';
import disDependencia from './routes/disDependencia.js';
import disDependenciaRed from './routes/disDependenciaRed.js';
import disRedArea from './routes/disRedArea.js'
import lote from './routes/lote.js'
import pedido from "./routes/pedido.js"
import producto from "./routes/producto.js"
import redConocimiento from './routes/redConocimineto.js'
import salida from './routes/salida.js'
import entrada from './routes/entrada.js'
import persona from './routes/usuario.js';

const port=process.env.PORT
let app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'))
app.use("/api/area", area)
app.use("/api/contrato", contrato)
app.use("/api/dependencia", dependencia)
app.use("/api/destino", destino)
app.use("/api/detallePedido", detallePedido)
app.use("/api/detSalida", detSalida)
app.use("/api/disAreaDestino", disAreaDestino)
app.use("/api/disContratoLote", disContratoLote)
app.use("/api/disDependencia", disDependencia)
app.use("/api/disDependenciaRed", disDependenciaRed)
app.use("/api/disRedArea", disRedArea)
app.use("/api/lote", lote)
app.use("/api/pedido", pedido)
app.use("/api/producto", producto)
app.use("/api/redConocimiento", redConocimiento)
app.use("/api/salida", salida)
app.use("/api/entrada", entrada)
app.use("/api/persona", persona)

const server = http.createServer(app)

mongoose.connect(`${process.env.mongoDB}`)
  .then(() => console.log('Connected!'));

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});