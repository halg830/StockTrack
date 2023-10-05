import express from 'express';
import "dotenv/config"
import mongoose from 'mongoose'
import http from 'http';
import * as io from 'socket.io'
import controllerSockets from "./sockets/controller.js"
import persona from './routes/usuario.js';
import distribucionLoteFicha from './routes/distribucionLoteFicha.js'
import lote from './routes/lote.js'

const port=process.env.PORT
let app = express();
app.use(express.json());
app.use(express.static('public'))
app.use("/api/persona", persona)
app.use("/api/asignacion", distribucionLoteFicha)
app.use("/api/lote", lote)
const server = http.createServer(app)

let ioServer = new io.Server(server);
app.set('socketio', io)

ioServer.on('connection', controllerSockets);

mongoose.connect(`${process.env.mongoDB}`)
  .then(() => console.log('Connected!'));

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});