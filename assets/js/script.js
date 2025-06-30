document.addEventListener("DOMContentLoaded", function () {
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
    // variable used for button clicks to set the chosen animal in animalSelection(), default value is 'whale'
    let selectedAnimal = "whale";
    /**
     *  style.display info checked here: https://developer.mozilla.org/en-US/docs/Web/CSS/display
     * @param {string} animal 
     */
    function animalSelection(animal) {
        selectedAnimal = animal; // Store the selected animal
        const image = document.getElementById("introImage");
        const paragraph = document.getElementById("introText");
        const title = document.getElementById("introTitle");
        let whaleText = `Blue whales are the biggest animals on
                Earth—even bigger than dinosaurs! These gentle giants live in the
                ocean and can grow as long as three school buses lined up. Even
                though they’re huge, they eat tiny creatures called krill,
                swallowing thousands in one gulp.`;
        let axolotlText = `Axolotls are magical little creatures that live underwater and can
                even regrow their body parts! Unlike most salamanders, they stay in the water
                their whole lives and use their frilly gills to breathe.`;
        let penguinText = `Penguins are waddle-tastic birds that love the cold! They
                can’t fly, but they’re amazing swimmers. Penguins love to slide on their
                bellies across the ice—it’s like their version of sledding!`;
        let catText = `Cats are playful, curious, and sometimes a little sneaky!
                They love to chase things, pounce, and even climb up high to
                explore. When they’re happy, they purr—a soft little rumbling sound
                that means they feel cozy and safe.
                `;
        paragraph.style.display = "block";
        image.style.display = "block";
        title.style.display = "block";
        switch (animal) {
            case 'whale':
                title.innerText = "Whales";
                paragraph.innerText = whaleText;
                image.src = "assets/images/whales-feeding.webp";
                gsap.to("body", { backgroundColor: "#62929e", duration: 1.5 });
                break;
            case 'axolotl':
                title.innerText = "Axolotls";
                paragraph.innerText = axolotlText;
                image.src = "assets/images/pink-axolotl-close.webp";
                gsap.to("body", { backgroundColor: "#bb7cdf", duration: 1.5 });
                break;
            case 'penguin':
                title.innerText = "Penguins";
                paragraph.innerText = penguinText;
                image.src = "assets/images/2-emperor-penguins.webp";
                gsap.to("body", { backgroundColor: "#4240b5", duration: 1.5 });
                break;
            case 'cat':
                title.innerText = "Cats";
                paragraph.innerText = catText;
                image.src = "assets/images/cats-sleeping.webp";
                gsap.to("body", { backgroundColor: "#f04276", duration: 1.5 });
                break;
            default:
                console.log(`${animal} not an accepted case. animalSelection() accepts whale, penguin, cat, axolotl`)
                break;
        }
        gsap.to("#introBanner", {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                document.getElementById("introBanner").classList.add("hide");
                // document.getElementById("animalChoiceSpacer").classList.remove("screenSpaceSpace");
                // document.getElementById("animalChoiceSpacer").classList.add("halfscreenSpace");//this isnt working as desired yet. Maybe move the animal image up first

                document.getElementById("introDiv").classList.remove("hide");
                window.location.href = "#displaySection";
            }
        });
        // CSS smooth scrolling to scroll to the introSection after selecting your animal
        // call nextFact and VideoFilter to set correct content
        // nextFact(animal);
        // videoFilter(animal);

    }

    function buttonListener() {
        document.getElementById("videoBtn").addEventListener("click", function () {
            videoFilter(selectedAnimal);
        });
        document.getElementById("nextFactBtn").addEventListener("click", function () {
            nextFact(selectedAnimal);
        });
    }
    buttonListener();
    //window resize event from MDN docs: https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
    addEventListener("resize", () => {
        imgAreaScaler("imgSelect");
    });
    /**
     * Function to filter the video section on the first page. it is called in animalSelection() at  the end
     * and passed the same animal string. This looks for elements with the class "videDiv" and stops displaying
     * then enables them depending on the animal.
     * @param {string} animal 
     */
    function videoFilter() {
        const video = document.getElementById("videoFrame");
        const title = document.getElementById("videoTitle");
        document.getElementById("videoDiv").style.display = "block";

        switch (selectedAnimal) {
            case 'whale':
                title.innerText = "Watch a video about Whales";
                video.src = "https://www.youtube.com/embed/o767PuYbEXg";
                video.title = "Whale video";
                break;
            case 'axolotl':
                title.innerText = "Watch a video about Axolotls";
                video.src = "https://www.youtube.com/embed/tBEf7wqbroM";
                video.title = "Axolotl video"
                break;
            case 'penguin':
                title.innerText = "Watch a video about Penguins";
                video.src = "https://www.youtube.com/embed/Oyo6lz839h4";
                video.title = "Penguin video";
                break;
            case 'cat':
                title.innerText = "Watch a video about Cats";
                video.src = "https://www.youtube.com/embed/W86cTIoMv2U";
                video.title = "Cat video";
                break;
            default:
                console.log(`${selectedAnimal} not an accepted case. animalSelection() accepts whale, penguin, cat, axolotl`)
                break;
        }
        window.location.href = "#videoSection";
    }
    /**
     * used to control the displayed fact title, fact, and image. Takes data from quizQuestions.JSON
     * 
     * @param {string} animal 
     */
    function nextFact(animal) {
        // display #factDiv to make this content visible
        // document.getElementById("factDiv").style.display = "block";
        const title = document.getElementById("introTitle");
        const paragraph = document.getElementById("introText");
        const img = document.getElementById("introImage");
        let numberOfQuestions = 3;//There are a minimum 3 questions, so this is the default
        switch (animal) {
            case "whale":
                img.src = "assets/images/whale-tail.webp";
                title.innerText = factsData.whaleFacts[factIndex].question;
                paragraph.innerText = factsData.whaleFacts[factIndex].fact;
                numberOfQuestions = factsData.whaleFacts.length;
                break;
            case "axolotl":
                img.src = "assets/images/black-axolotl-on-sand.webp";
                title.innerText = factsData.axolotlFacts[factIndex].question;
                paragraph.innerText = factsData.axolotlFacts[factIndex].fact;
                numberOfQuestions = factsData.axolotlFacts.length;
                break;
            case "penguin":
                img.src = "assets/images/penguin-eyebrows.webp";
                title.innerText = factsData.penguinFacts[factIndex].question;
                paragraph.innerText = factsData.penguinFacts[factIndex].fact;
                numberOfQuestions = factsData.penguinFacts.length;

                break;
            case "cat":
                img.src = "assets/images/kittens-in-basket.webp";
                title.innerText = factsData.catFacts[factIndex].question;
                paragraph.innerText = factsData.catFacts[factIndex].fact;
                numberOfQuestions = factsData.catFacts.length;

                break;
            default:
                break;
        }
        //if we reached the end of the questions, set index to 0!
        if (factIndex < numberOfQuestions - 1) {
            factIndex++;
        }
        else {
            // set index back to 0 to allow facts to loop and animate in a new
            // button for the user to see
            factIndex = 0;
            document.getElementById("navBtnDiv").classList.remove("hide");
            gsap.from("#optionBtn", {
                duration: 1,
                opacity: 1,
                rotate: 360
            });
        }
        gsap.set("#introTitle", { opacity: 1, x: 0 });
        gsap.set("#introText", { opacity: 1, boxShadow: "none" });
        let tl = gsap.timeline();
        tl.from("#introTitle", { duration: 0.8, direction: "left", x: -100, opacity: 0 })
            .from("#introText", { duration: 1, direction: "left", opacity: 0 }, "-=0.5")

        window.location.href = "#factSection";
    }

    let openMenu = false;
    function showHideMenu() {
        // remove hide class to make visibile (immediately opacity goes to 0 from GSAP below)
        document.getElementById("restartBtn").classList.remove("hide");
        document.getElementById("videoBtn").classList.remove("hide");
        document.getElementById("quizBtn").classList.remove("hide");
        document.getElementById("galleryBtn").classList.remove("hide");
        //need these lines like the animation for teh introTitle to reset the position to 'default' otherwise
        // animations go from their new positions instead of the default
        gsap.set("#restartBtn", { y: 0, opacity: 1 });
        gsap.set("#videoBtn", { y: 0, opacity: 1 });
        gsap.set("#quizBtn", { y: 0, opacity: 1 });
        gsap.set("#galleryBtn", { y: 0, opacity: 1 });
        // if the menu bool is false (menu not open)
        if (openMenu == false) {
            // animate the buttons nicely upwards 'from' move from the defined pos to the CSS pos
            let tl = gsap.timeline();
            tl.from("#restartBtn", { opacity: 1, y: 50, duration: 0.5 })
                .from("#videoBtn", { opacity: 1, y: 100, duration: 0.5 }, "-=0.2")
                .from("#quizBtn", { opacity: 1, y: 150, duration: 0.5 }, "-=0.3")
                .from("#galleryBtn", { opacity: 1, y: 200, duration: 0.5 }, "-=0.4")
            openMenu = true;//set flag to true now animation is carried out
        }
        else {
            //animate down to hide - 'to' moves from the CSS pos to the position given
            let tl = gsap.timeline({
                onComplete: () => {
                    document.getElementById("restartBtn").classList.add("hide");
                    document.getElementById("videoBtn").classList.add("hide");
                    document.getElementById("quizBtn").classList.add("hide");
                    document.getElementById("galleryBtn").classList.add("hide");
                }
            });
            tl.to("#restartBtn", { opacity: 1, y: 50, duration: 0.5 })
                .to("#videoBtn", { opacity: 1, y: 100, duration: 0.5 }, "-=0.2")
                .to("#quizBtn", { opacity: 1, y: 150, duration: 0.5 }, "-=0.3")
                .to("#galleryBtn", { opacity: 1, y: 200, duration: 0.5 }, "-=0.4")
            openMenu = false;//menu was open, set flag to false after hide animation and clss
            //hide the buttons again!
        }
    }

    /**
       * validate the string in the name entry box. 
       * Rules: must fall within [A-Z-a-z]regular expression and be 3 to 10 characters long
       */
    let name = "";
    function nameValidation() {

        try {
            const nameElement = document.getElementById("nameEntry");
            name = nameElement.value;
        } catch (error) {
            //prompt an entry to make > null
            alert("Enter a name in the space");
        }
        let re = /[^A-Z-a-z]/g;//regular expression. Negated set - (true if does not include A-z)
        let nameValid = true;//assume entry is invalid till tested

        if (name.length < 3 || name.length > 10) {
            alert("name is too long! Between 3 and 10 chars pl0x");
        }
        else {
            nameValid = re.test(name);
            //illegal characters found...
            if (nameValid == true) {
                //get user to try again, show the rules
                alert("no mate, just use letters.");
            }
            else {
                //welcome the user to the quiz reveal the quiz section fully
                // quizContents(name);
                //hide the name entry div
                let tl = gsap.timeline();
                tl.to("#nameEntryDiv", {
                    opacity: 0,
                    x: -400,
                    scale: 0.8,
                    duration: 0.5,
                    ease: "back.out",
                    onComplete: ()=>{
                        document.getElementById("nameEntryDiv").classList.add("hide");
                        document.getElementById("quizForm").classList.remove("hide");
                    }
                })
                .from("#quizForm",{
                    x:-400,
                    duration:0.5,
                    ease: "back.in"
                })
                
            }
        }
    }
    /**
 * Function to determine the questions to be asked in the quiz. Requires the
 * string animal name (as used for setting the sitewide animal chosen)
 * data is the JSON from the fetch request before / in getQuizData()
 * @param {string} animal 
 * @param {JSON} data 
 */
    let lastIndex = [];
    let correctAnswer;
    // find number of questions per animal, assign rnd to questionIndex
    function quizContents() {
        document.getElementById("introDiv").classList.add("hide");
        const question = document.getElementById("questionP");
        const answers = document.getElementsByClassName("form-check-label");
        const quizElement = document.getElementById("popQuiz");
        quizElement.classList.remove("hide");
        quizElement.style.display = "block";

        let questionIndex = 0;
        let animalQuestions;
        switch (selectedAnimal) {
            case "whale":
                animalQuestions = factsData.whaleQuestions.length;
                break;
            case "axolotl":
                animalQuestions = factsData.axolotlQuestions.length;
                break;
            case "penguin":
                animalQuestions = factsData.penguinQuestions.length;
                break;
            case "cat":
                animalQuestions = factsData.catQuestions.length;
                break;
            default:
                break;
        }

        //to stop infinte while loop. if the length of lastindex is as long as the available number of questions, end the quiz
        //or set lastindex back to empty.
        if (lastIndex.length >= animalQuestions) {
            lastIndex = [];//set back to empty for the next time an animal is chosen or the quiz is run
            //end the quiz
        }
        // if number is already present (question asked...) try generating again
        do {
            questionIndex = Math.floor(Math.random() * animalQuestions);// https://www.w3schools.com/JS/js_random.asp for creating random integers
        }
        while (lastIndex.includes(questionIndex))

        lastIndex.push(questionIndex);

        switch (selectedAnimal) {
            case "whale":
                question.innerText = factsData.whaleQuestions[questionIndex].question;
                answers[0].innerText = factsData.whaleQuestions[questionIndex].answerOne;
                answers[1].innerText = factsData.whaleQuestions[questionIndex].answerTwo;
                answers[2].innerText = factsData.whaleQuestions[questionIndex].answerThree;
                correctAnswer = factsData.whaleQuestions[questionIndex].correctAnswer;
                break;
            case "axolotl":
                question.innerText = factsData.axolotlQuestions[questionIndex].question;
                answers[0].innerText = factsData.axolotlQuestions[questionIndex].answerOne;
                answers[1].innerText = factsData.axolotlQuestions[questionIndex].answerTwo;
                answers[2].innerText = factsData.axolotlQuestions[questionIndex].answerThree;
                correctAnswer = factsData.axolotlQuestions[questionIndex].correctAnswer;
                break;
            case "penguin":
                question.innerText = factsData.penguinQuestions[questionIndex].question;
                answers[0].innerText = factsData.penguinQuestions[questionIndex].answerOne;
                answers[1].innerText = factsData.penguinQuestions[questionIndex].answerTwo;
                answers[2].innerText = factsData.penguinQuestions[questionIndex].answerThree;
                correctAnswer = factsData.penguinQuestions[questionIndex].correctAnswer;

                break;
            case "cat":
                question.innerText = factsData.catQuestions[questionIndex].question;
                answers[0].innerText = factsData.catQuestions[questionIndex].answerOne;
                answers[1].innerText = factsData.catQuestions[questionIndex].answerTwo;
                answers[2].innerText = factsData.catQuestions[questionIndex].answerThree;
                correctAnswer = factsData.catQuestions[questionIndex].correctAnswer;
                break;
            default:
                break;
        }

    }
    /**
     * This used an AI suggested solution to work correctly with the .this keyword
     * @param {*} radioInput 
     */
    function checkAnswer(radioInput) {
        const feedback = document.getElementById("quizfeedbackP");
        const label = document.querySelector('label[for="' + radioInput.id + '"]');
        const labelText = label ? label.innerText.trim() : "";
        // Use labelText for answer checking
        console.log(labelText);

        if (labelText == correctAnswer) {
            //answer is correct - inform user
            alert("You picked the right answer");
            feedback.innerText="Well done, that was right!"
            quizContents();
        }
        else {
            //answer is incorrect - show user the correct answer
            alert(`Sorry, the answer was: ${correctAnswer}`);
            feedback.innerText=`Oops! The answer was: ${correctAnswer}`;
            
        }
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
     * @param {float } ratio 
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

    // GSAP notes
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
            { opacity: 1, y: '20vh', duration: 2, ease: "power1.out", },

        );
        tl.to("#introBanner", {
            opacity: 1, duration: 1, ease: "back.in"
        },"-=1.5s")
        tl.from(".animalChoiceImg", {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: "back.out"
        });
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
        repeat: -1,
        yoyo: true,
        repeatDelay: 1.5
    });
    gsap.to(".animalChoiceImg", {
        delay: 1.5,
        opacity: 1,
        scale: 0.8,
        duration: 0.8,
        ease: "back.out"
    });


    // I want to transistion the imgSelect out or fade etc. and then the current animal, transitions in from
    //the top or sides. clicking the animal then resets back to the imgSelect!

    // read quiz json - This is modified from API_part01 with the swapi fetch
    fetch("assets/js/quizQuestions.json")
        .then((response) => response.json())
        .then((data) => {
            // Store facts arrays for use in nextFact
            factsData = data;
        });

    let factsData = {};
    let factIndex = 0;

    // At the end of the DOMContentLoaded function, expose functions globally
    window.animalSelection = animalSelection;
    window.quizContents = quizContents;
    window.nextFact = nextFact;
    window.showHideMenu = showHideMenu;
    window.nameValidation = nameValidation;
    window.checkAnswer = checkAnswer;
});//end of doc load event