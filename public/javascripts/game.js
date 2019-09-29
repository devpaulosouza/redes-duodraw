console.log(io)

const socket = io('http://localhost:3000')

function setup() {
    createCanvas(500, 500);
    background(102);
    socket.on('returnDrawerResponse', function() {
        console.log('id', 'passou aqui!')
      });
}

function draw() {
    stroke(255);
    if (mouseIsPressed) {
        line(mouseX, mouseY, pmouseX, pmouseY);

        socket.emit('sendDraw', {mouseX, mouseY, id: socket.id})
    }
    socket.on('returnDrawerResponse', function() {
        console.log('teste')
    })
}