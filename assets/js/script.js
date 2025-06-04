/*
This script was taken from the MDN docs: https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
*/
// When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;

const myPics = document.getElementById("myCanvas");
const context = myPics.getContext("2d");
document.getElementById("showImg").addEventListener("click", () => {updateImage();});
// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

// Add the event listeners for mousedown, mousemove, and mouseup
myPics.addEventListener("mousedown", (e) => {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
});

myPics.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        drawLine(context, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }
});

window.addEventListener("mouseup", (e) => {
    if (isDrawing) {
        drawLine(context, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
    }
});

function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}
//---------------------------------------------------
/**
 * updates the img element src with the id "newImg" with the current canvas image.
 */
let mouseFollowerInitialized = false;

function updateImage() {
    const img = document.getElementById("newImg");
    const canvasImg = document.getElementById("myCanvas").toDataURL("image/png");
    img.src = canvasImg;
    img.style.position = "absolute";
    img.style.pointerEvents = "none"; // Let mouse events pass through
    img.style.display = "block";
    if (!mouseFollowerInitialized) {
        mouseFollower();
        mouseFollowerInitialized = true;
    }
}

function mouseFollower(){
    const follower = document.getElementById("newImg");
    document.addEventListener("mousemove", (e) => {
        follower.style.left = e.pageX + "px";
        follower.style.top = e.pageY + "px";
    });
}