console.log(io)

const socket = io('http://localhost:3000')

function setup() {
    createCanvas(500, 500);
    background(102);
}

function draw() {
    stroke(255);
    if (mouseIsPressed) {
        line(mouseX, mouseY, pmouseX, pmouseY);
        socket.emit('sendDraw', {mouseX, mouseY, id: socket.id}, () => {} //Callback function
        )
    }
}

socket.on('drawResponse', data => {
    line(data.mouseX, data.mouseY, data.mouseX, data.mouseY)
    console.log('Client says:', message)
})