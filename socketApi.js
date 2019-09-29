import socketio from 'socket.io';

const io = socketio();

var connections = new Array()

io.on('connection', client => {
    connections.push(client.id)

    client.on('join', () => {
        console.log('join')
    })

    client.on('send', (i, e) => {
        console.log(e, i)
        console.log('teste')
    })
    
    console.log('conectou', client.id)

})

export const send = (x, y) => {
    io.sockets.emit('hello', { x, y})
}

export default io;

// 285461
