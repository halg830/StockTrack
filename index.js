import express from 'express';
import "dotenv/config"
import mongoose from 'mongoose'
import http from 'http';
import * as io from 'socket.io'
import controllerSockets from "./sockets/controller.js"
import persona from './routes/usuario.js';
import distribucionLoteFicha from './routes/distribucionLoteFicha.js'
import lote from './routes/lote.js'
import itemPresupuesto from './routes/itemPresupuesto.js'
import distribucionPresupuesto from './routes/distribucionPresupuesto.js';
import ficha from './routes/ficha.js'
import area from "./routes/area.js"
import detallePedido from "./routes/detallePedido.js"
import pedido from "./routes/pedido.js"
import producto from "./routes/producto.js"
import cors from 'cors'
import session from 'express-session';
import bodyParser from 'body-parser';

const port=process.env.PORT
let app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'))
app.use("/api/persona", persona)
app.use("/api/asignacion", distribucionLoteFicha)
app.use("/api/lote", lote)
app.use("/api/item", itemPresupuesto)
app.use("/api/distribucion", distribucionPresupuesto)
app.use("/api/ficha", ficha)
app.use("/api/area", area)
app.use("/api/detallePedido", detallePedido)
app.use("/api/pedido", pedido)
app.use("/api/producto", producto)

app.use(session({
  name: 'stockTrackCokkie', 
  secret: 'secreto',
}));
const server = http.createServer(app)

let ioServer = new io.Server(server);
app.set('socketio', io)

ioServer.on('connection', controllerSockets);

mongoose.connect(`${process.env.mongoDB}`)
  .then(() => console.log('Connected!'));

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});