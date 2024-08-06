const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const port = 9000;
const path = require('path')
const users = {}
const { Server } = require('socket.io')
const io = new Server(server)
app.use(express.static(path.resolve('./public')))
app.get('/', (req, res) => {
    res.sendFile('/public/index.html')
})

// start coding of whatsapp clone
// handle Socket io
io.on('connection', (socket) => {
    // New user Joined
    socket.on('new-user-join', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
        console.log("New user is : ", name);
    })

    // User send and receive message 
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    })

    // User Left the chat 
    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id])
        console.log('disconnect', users[socket.id]);
        delete users[socket.id]
    })
})

// Server connection
server.listen(port, () => {
    console.log(`Server start at port http://localhost:${port}`);
})