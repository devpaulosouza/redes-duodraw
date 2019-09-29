import socketio from 'socket.io';

const io = socketio();

var connections = [];

const desenhos = [ 'desenha uma fro', 'desenha um arcoiro', 'desenhe uma bola' ];

io.on('connection', function(socket) {

    // não aceitar mais de duas conexões
    if (connections.length === 2) return;


    connections.push(socket.id)

    socket.emit('position', connections.length % 2 == 0 ? 'esquerda' : 'direita');

    if (connections.length === 2) {
        console.log(desenhos[parseInt(Math.random() * desenhos.length)])
        io.emit('drawIt', desenhos[parseInt(Math.random() * desenhos.length)])
    }

    socket.on('sendDraw', data => socket.broadcast.emit('drawResponse', data))
    
    console.log('user connected', socket.id)

})

export const send = (x, y) => {
    io.sockets.emit('hello', {x, y})
}

export default io;
