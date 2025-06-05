/*
This script was taken from the MDN docs: https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
*/
// When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;

const myPics = document.getElementById("myCanvas");
const context = myPics.getContext("2d");
document.getElementById("showImg").addEventListener("click", () => { updateImage(); });
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

function colorPicker(){
     context.strokeStyle = document.getElementById("drawingColor").value;

    const penThickness = document.getElementById("drawingThickness").value;
    console.log("Color: ", color, "Thickness: ", penThickness);
}
// colorPicker(); // Call the function to set the initial color and thickness

/**
 * 
 * @param {*} context object of the canvas and sets various properties. context.strokeStyle is the colour, context.lineWidth is the width or thickness of the line.
 * @param {*} x1 the x coordinate of the first point
 * @param {*} y1 the y coordinate of the first point
 * @param {*} x2 the x coordinate of the second point
 * @param {*} y2 the y coordinate of the second point
 */
function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    // context.strokeStyle = "black";// removed from the original code, so that colors can be set by the user!
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}
//---------------------------------------------------


let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
let followingImg = null;
let animationFrameId = null;

function animateImageFollow() {
    if (!followingImg) return;//if there is no image to follow, stop the animation
    currentX += (targetX - currentX) * 0.01;//smoothly interpolate the position using lerping method. the decimal define the speed (lower is slower)
    currentY += (targetY - currentY) * 0.01;
    followingImg.style.left = currentX + "px";//set the position of the image gathered from the mousemove eventlistener to the image
    followingImg.style.top = currentY + "px";
    animationFrameId = requestAnimationFrame(animateImageFollow);
}

/**
 * Make the image with the id "newImg" follow the cursor
 * @returns 
 */
function makeImageFollow() {
    followingImg = document.getElementById("newImg");

    document.addEventListener("mousemove", (e) => {
        targetX = e.clientX - 50;
        targetY = e.clientY - 50;
    });
    // Start at the current mouse position
    currentX = targetX;
    currentY = targetY;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animateImageFollow();
}

/**
 * updates the img element src with the id "newImg" with the current canvas image.
 */
function updateImage() {
    const img = document.getElementById("newImg");
    const canvasImg = document.getElementById("myCanvas").toDataURL("image/png");
    img.src = canvasImg;
    img.style.position = "fixed";
    img.style.pointerEvents = "none"; // Let mouse events pass through
    img.style.display = "block";
    makeImageFollow();
}


