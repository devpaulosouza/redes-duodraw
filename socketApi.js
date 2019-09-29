import socketio from 'socket.io';

const io = socketio();

// lista com conexões 
var connections = [];

// lista de desenhos no qual será escolhido um aleatório.
const desenhos = [ 'desenha uma fro', 'desenha um arcoiro', 'desenhe uma bola' ];

io.on('connection', function(socket) {
    // não aceitar mais de duas conexões
    if (connections.length === 2) return;


    // adiciona o id na conexão para controle
    connections.push(socket.id)

    // envia para o cliente qual a posição permitida 
    socket.emit('position', connections.length % 2 == 0 ? 'esquerda' : 'direita');

    // se entraram dois jogadores, inicia o jogo
    if (connections.length === 2) {
        io.emit('drawIt', desenhos[parseInt(Math.random() * desenhos.length)])
    }

    socket.on('sendDraw', data => socket.broadcast.emit('drawResponse', data))
    
    console.log('user connected', socket.id)

})

export default io;
