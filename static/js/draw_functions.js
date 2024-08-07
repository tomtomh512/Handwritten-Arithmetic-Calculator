/*
    taken from https://codepen.io/julio_ok/pen/ozpqGO
*/

var square = document.getElementById("drawPlace");
var paper = square.getContext("2d");
var pressedMouse = false;
var x;
var y;
var colorLine = "black";
var timeout;

paper.fillStyle = "#ffffff";
paper.fillRect(0, 0, square.width, square.height);

square.addEventListener("mousedown", startDrawing);
square.addEventListener("mousemove", drawLine);
square.addEventListener("mouseup", stopDrawing);

function startDrawing(eventvs01) {
    pressedMouse = true;
    x = eventvs01.offsetX;
    y = eventvs01.offsetY;
}

function drawLine(eventvs02) {
    if (pressedMouse) {
        document.getElementById("drawPlace").style.cursor = "crosshair";
        var xM = eventvs02.offsetX;
        var yM = eventvs02.offsetY;
        drawing_line(colorLine, x, y, xM, yM, paper);
        x = xM;
        y = yM;
    }
}

function stopDrawing() {
    pressedMouse = false;
    document.getElementById("drawPlace").style.cursor = "default";

    // Start a timeout to detect when the user has stopped drawing
    clearTimeout(timeout);
    timeout = setTimeout(generateImage, 1000);
}

function drawing_line(color, x_start, y_start, x_end, y_end, board) {
    board.beginPath();
    board.strokeStyle = color;
    board.lineWidth = 5;
    board.moveTo(x_start, y_start);
    board.lineTo(x_end, y_end);
    board.stroke();
    board.closePath();
}

function clearCanvas() {
    // Clear the entire canvas by setting the width and height to the same as the canvas element's width and height
    paper.clearRect(0, 0, square.width, square.height);
    paper.fillStyle = "#ffffff";
    paper.fillRect(0, 0, square.width, square.height);
}

function generateImage() {
    var url = square.toDataURL('image/jpg');

    fetch('/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            imageBase64: url,
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.output == '=') {
                solve();
            } else {
                appendExpression(data.output);
            }
        })

    clearCanvas();
    showExpression();
}