console.log(io)

const socket = io('http://localhost:3000')

let position;

function setup() {
    createCanvas(500, 500);
    background(102);
}

function myPosition() {
    return (width / 2)
}

function draw() {
    stroke(255);
    if (mouseIsPressed && (position == 'esquerda' ? mouseX < (width / 2) : mouseX > (width / 2))) {
        line(mouseX, mouseY, pmouseX, pmouseY);
        socket.emit('sendDraw', {mouseX, mouseY, pmouseX, pmouseY, id: socket.id})
    }
}

socket.on('drawResponse', data => {
    line(data.mouseX, data.mouseY, data.pmouseX, data.pmouseY)
    console.log('Client says:', data)
})

socket.on('position', data => {

    console.log('okkkk')
    position = data;
    console.log('position', data)
})