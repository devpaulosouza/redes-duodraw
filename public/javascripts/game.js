const socket = io('http://localhost:3000')

// lado permitido para desenhar na tela
let position;

function setup() {
    // cria um quadro para desenho
    createCanvas(1000, 500);

    background(230);

    // desenha uma linha dividindo a tela
    line(width / 2, 0, width / 2, height)
}

function draw() {
    stroke(255);
    // caso esteja com o mouse pressionado do lado permitido desenhar na tela
    if (mouseIsPressed && (position == 'esquerda' ? mouseX < (width / 2) : mouseX > (width / 2))) {
        line(mouseX, mouseY, pmouseX, pmouseY);

        // envia para o servidor a posição do mouse, emitindo o evento drawrResponse para os outros clientes conectados
        socket.emit('sendDraw', {mouseX, mouseY, pmouseX, pmouseY, id: socket.id})
    }
}

// escuta o evento "drawResponse" emitido pelo servidor
socket.on('drawResponse', data => {
    line(data.mouseX, data.mouseY, data.pmouseX, data.pmouseY)
})

// escuta o evento que diz que o jogo começou
socket.on('drawIt', data => {
    document.getElementById('draw').innerHTML = data
})

// escuta o evento que informa qual o lado permitido para desenhar
socket.on('position', data => {
    position = data;
})