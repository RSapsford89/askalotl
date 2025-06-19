/*
This script was taken from the MDN docs: https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
*/

// When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;

const myPics = document.getElementById("drawingCanvas");
const context = myPics.getContext("2d");

document.getElementById("showImg").addEventListener("click", () => { updateImage(); });
// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

// Add the event listeners for mousedown, mousemove, and mouseup
myPics.addEventListener("pointerdown", (e) => {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
});

myPics.addEventListener("pointermove", (e) => {
    if (isDrawing) {
        drawLine(context, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }
});

window.addEventListener("pointerup", (e) => {
    if (isDrawing) {
        drawLine(context, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
    }
});


/**
 * Set the colour and thickness of the drawing/pen line. Uses a colour input picker and a slider for thickness.
 * The values are taken from the HTML elements with the ids "drawingColor" and "drawingThickness".
 */
function colorPicker() {
    context.strokeStyle = document.getElementById("drawingColor").value;
    context.lineWidth = document.getElementById("drawingThickness").value;
    console.log("Color: ", context.strokeStyle, "Thickness: ", context.lineWidth);
}
/**
 * Reset the canvas and the image element with an id of "newImg". Src is set to empty and the canvas
 * has a clearRect command which clears the canvas with parameters of 0, 0, width, height.
 */
function resetImg() {
    const img = document.getElementById("newImg");
    img.src = "";
    context.clearRect(0, 0, myPics.width, myPics.height); // Clear the canvas. Command found via https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
}

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
    // context.lineWidth = 1; // removed from the original code, so that thickness can be set by the user!
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
//global for area mapping
let previousSize = 300;

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
    const canvasImg = document.getElementById("drawingCanvas").toDataURL("image/png");
    img.src = canvasImg;
    img.style.position = "fixed";
    img.style.pointerEvents = "none"; // Let mouse events pass through
    img.style.display = "block";
    makeImageFollow();
}
/**
 *  style.display info checked here: https://developer.mozilla.org/en-US/docs/Web/CSS/display
 * @param {string} animal 
 */
function animalSelection(animal) {
    selectedAnimal = animal; // Store the selected animal
    const image = document.getElementById("imgSelect");
    const paragraphs = document.getElementsByClassName("introText");
    // For loop to iterate and hide all the elements 
    for (let p = 0; p < paragraphs.length; p++) {
        paragraphs[p].style.display = "none";
    }
    switch (animal) {
        case 'whale':
            paragraphs[0].style.display = "block";
            paragraphs[1].style.display = "block";
            gsap.to("body",{backgroundColor: "#62929e", duration: 1.5});
            break;
        case 'axolotl':
            paragraphs[2].style.display = "block";
            paragraphs[3].style.display = "block";
            gsap.to("body",{backgroundColor: "#bb7cdf", duration: 1.5});
            
            break;
        case 'penguin':
            paragraphs[4].style.display = "block";
            paragraphs[5].style.display = "block";
            gsap.to("body",{backgroundColor: "#4240b5", duration: 1.5});
            break;
        case 'cat':
            paragraphs[6].style.display = "block";
            paragraphs[7].style.display = "block";
            gsap.to("body",{backgroundColor:"#f04276", duration: 1.5});
            break;
        default:
            console.log(`${animal} not an accepted case. animalSelection() accepts whale, penguin, cat, axolotl`)
            break;
    }
    // CSS smooth scrolling to scroll to the introSection after selecting your animal
    window.location.href = "#introTextSection";
}
//window resize event from MDN docs: https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
addEventListener("resize", () => {
    imgAreaScaler("imgSelect");
});
/**
 * Function to silter the video section on the first page. it is called in animalSelection() at  the end
 * and passed the same animal string. This looks for elements with the class "videDiv" and stops displaying
 * then enables them depending on the animal.
 * @param {string} animal 
 */
function videoFilter() {
    const videos = document.getElementsByClassName("videoDiv");
    for (let vid = 0; vid < videos.length; vid++) {
        videos[vid].style.display = "none";

    }
    switch (selectedAnimal) {
        case 'whale':
            videos[0].style.display = "block";
            break;
        case 'axolotl':
            videos[1].style.display = "block";
            break;
        case 'penguin':
            videos[2].style.display = "block";
            break;
        case 'cat':
            videos[3].style.display = "block";
            break;
        default:
            console.log(`${selectedAnimal} not an accepted case. animalSelection() accepts whale, penguin, cat, axolotl`)
            break;
    }
}
// Attach event listener on the Next button which will navigate to the href when pressed.
const nextButton = document.querySelector('#introTextSection button[type="button"]');
if (nextButton) {
    nextButton.addEventListener('click', function () {
        videoFilter();
        // Optionally scroll to video section
        window.location.href = "#videoSection1";
    });
}
/**
 * Function to scale the size of Image Maps on an image to work with responsive
 * elements! Takes the original image size, create co-ords, scales according to
 * the larger sized image. I.e make a ratio to multiply the image map co-ords by.
 * create array of co-ords -> multiply each by ratio -> assign new value to image map 
 */
function imgAreaScaler(imgId) {

    let img = document.getElementById(imgId);

    console.log(img.width);
    let currentX = img.width;//live image size in viewport - changes due to responsiveness
    let currentY = img.height;
    let ratio = currentX / previousSize;//to yield ratio -> newsize/oldsize
    console.log(currentX, currentY, ratio);
    imgMapScaler(ratio);//call scaler function to change the co-ords
    previousSize = currentX;//update the 'last size' for next time
}
/**
 * Takes the imgAreaScaler ratio and determines new imgMap co-ords by reading custom
 * data-attribute
 * from MDN , map method can change a string array to a num array: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 * @param {this is the imgAreaScaler ratio } ratio 
 */
function imgMapScaler(ratio) {

    let whale = document.querySelector('area[data-attribute="whale"]');
    let axolotl = document.querySelector('area[data-attribute="axolotl"]');
    let penguin = document.querySelector('area[data-attribute="penguin"]');
    let cat = document.querySelector('area[data-attribute="cat"]');

    let strWhale = (whale.getAttribute("coords")).split(',');
    let strAxolotl = (axolotl.getAttribute("coords")).split(',');
    let strPenguin = (penguin.getAttribute("coords")).split(',');
    let strCat = (cat.getAttribute("coords")).split(',');

    let numWhale = strWhale.map(Number);
    let numAxolotl = strAxolotl.map(Number);
    let numPenguin = strPenguin.map(Number);
    let numCat = strCat.map(Number);

    let newArr = [16];
    for (let i = 0; i < numWhale.length; i++) {
        newArr[i] = Math.round(numWhale[i] * ratio);
        newArr[i + 4] = Math.round(numAxolotl[i] * ratio);
        newArr[i + 8] = Math.round(numPenguin[i] * ratio);
        newArr[i + 12] = Math.round(numCat[i] * ratio);

    }

    whale.setAttribute("coords", `${newArr[0]},${newArr[1]},${newArr[2]},${newArr[3]}`);
    axolotl.setAttribute("coords", `${newArr[4]},${newArr[5]},${newArr[6]},${newArr[7]}`);
    penguin.setAttribute("coords", `${newArr[8]},${newArr[9]},${newArr[10]},${newArr[11]}`);
    cat.setAttribute("coords", `${newArr[12]},${newArr[13]},${newArr[14]},${newArr[15]}`);
}

const img = document.getElementById('imgSelect');
if (img.complete) {
    imgAreaScaler('imgSelect');
} else {
    img.addEventListener('load', () => imgAreaScaler('imgSelect'));
}
window.addEventListener('resize', () => imgAreaScaler('imgSelect'));
// animalSelection();

//module.exports ={imgMapScaler,animalSelection};
// GSAP testing...
// .from says move FROM the current state to their default state (entrance animations)
// .to move TO a new state from the default state (exit animations)
// .fromTo says define a first state and then animate to a second state 
// this is the least efficient as you are making 2 style changes (for full control animations)
gsap.registerEffect({
    name: "fade",
    effect: (targets, config) => {
        return gsap.to(targets, { duration: config.duration, opacity: 0 });
    },
    defaults: { duration: 2 },
    extendTimeline: true,
});


// the animation Easing effects are demo'd here: https://gsap.com/resources/getting-started/Easing
document.getElementById("headingTitle").addEventListener("click", () => {
    let tl = gsap.timeline();

    tl.to("#headingTitle", {
        direction: "up",
        duration: 1,
        opacity: 0,
        onComplete: () => {
            document.getElementById("headingTitle").style.display = "none";
            document.getElementById("mapDiv").classList.remove("disabled");
        }
    });
    // opactiy of 0, slide up from bottom
    tl.to("#imgSelect",
        // { opacity: 0, y:0 },
        { opacity: 1, y: '-35vh', duration: 2, ease: "power1.out", },

    );
    tl.to("#introBanner", {
        opacity: 1, duration: 1, ease: "back.in"
    })
    // add in an animation which makes the title look like it is shaking on repeat
    

});
// split text animation
gsap.registerPlugin(SplitText);

gsap.set("h1", { opacity: 1 });

let split = SplitText.create("#headingTitle", { type: "chars" });

// falling letters using stagger and the above string split
gsap.from(split.chars, {
    y: 20,
    autoAlpha: 0,
    stagger: 0.05,
});


// I want to transistion the imgSelect out or fade etc. and then the current animal, transitions in from
//the top or sides. clicking the animal then resets back to the imgSelect!