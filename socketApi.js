import socketio from 'socket.io';

const io = socketio();

var connections = new Array()

let players = [];

const getPlayer = socket => players.filter(p => p.id == socket.id);

io.on('connection', function(socket) {
    connections.push(socket.id)


    players.push(socket);

    socket.emit('position', players.length % 2 == 0 ? 'esquerda' : 'direita');

    console.log('join', players.length)

    socket.on('join', () => {
    })

    socket.on('sendDraw', function(data) { 
        console.log('Servidor diz:', data)

        socket.broadcast.emit('drawResponse', data)
      })
    
    console.log('conectou', socket.id)

})

export const send = (x, y) => {
    io.sockets.emit('hello', {x, y})
}

export default io;

// 285461
