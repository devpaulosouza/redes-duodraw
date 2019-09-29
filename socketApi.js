import socketio from 'socket.io';

const io = socketio();

var connections = new Array()

io.on('connection', function(socket) {
    connections.push(socket.id)

    socket.on('join', () => {
        console.log('join')
    })

    socket.on('sendDraw', function(data) { 
        console.log('Servidor diz:', data)

        io.sockets.emit('drawResponse', data)
      })
    
    console.log('conectou', socket.id)

})

export const send = (x, y) => {
    io.sockets.emit('hello', {x, y})
}

export default io;

// 285461
