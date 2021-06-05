const express = require('express')
// servidor de express
const http = require('http');
// configuracion del socket server
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // http server
        this.server = http.createServer(this.app)
        // consfiguraciones de sockets
        this.io = socketio(this.server)
        this.configurarSockets()
    }

    middlewares() {
        this.app.use(express.static(path.resolve(__dirname, '../public')))
        this.app.use(cors())
    }

    configurarSockets() {
        new Sockets(this.io)
    }

    execute() {
        this.middlewares()
        this.server.listen(this.port, () => {
            console.log("server corriendo " + this.port);
        });
    }
}

module.exports = Server