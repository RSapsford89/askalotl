document.addEventListener("DOMContentLoaded", function () {
    //global for area mapping
    let previousSize = 300;
    // variable used for button clicks to set the chosen animal in animalSelection(), default value is 'whale'
    let selectedAnimal = "whale";

    /**
     * Handles animal selection, updates intro section content and background color,
     * and transitions to the display section.
     * @param {string} animal - The selected animal ('whale', 'axolotl', 'penguin', 'cat')
     */
    function animalSelection(animal) {
        selectedAnimal = animal; // Store the selected animal
        const image = document.getElementById("introImage");
        const paragraph = document.getElementById("introText");
        const title = document.getElementById("introTitle");
        document.getElementById("popQuiz").classList.add("hide");
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
                that means they feel cozy and safe.`;
        paragraph.style.display = "block";
        image.style.display = "block";
        title.style.display = "block";
        image.classList.remove("penguinChoice");
        document.getElementById("nextFactBtn").innerHTML=`Next <i class="fa-solid fa-caret-right"></i>`;
        switch (animal) {
            case 'whale':
                title.innerText = "Whales";
                paragraph.innerText = whaleText;
                image.src = "assets/images/whale-waving.webp";
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
                image.classList.add("penguinChoice");
                gsap.to("body", { backgroundColor: "#9eddee", duration: 1.5 });
                break;
            case 'cat':
                title.innerText = "Cats";
                paragraph.innerText = catText;
                image.src = "assets/images/cat-toe-beans.webp";
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
                document.getElementById("introDiv").classList.remove("hide");
                window.location.href = "#displaySection";
            }
        });
    }

    /**
     * Adds event listeners for the video and next fact buttons.
     */
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
     * Updates the video section based on the selected animal. Used in modal
     * @param {string} animal - The selected animal
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
                console.log(`${selectedAnimal} not an accepted case. videoFilter() accepts whale, penguin, cat, axolotl`);
                break;
        }
        window.location.href = "#videoSection";
    }
    
    /**
     * Displays the next fact for the selected animal, updates the fact section,
     * and animates the transition. Loops facts when reaching the end.
     * @param {string} animal - The selected animal
     */
    function nextFact(animal) {
        // display #factDiv to make this content visible
        const title = document.getElementById("introTitle");
        const paragraph = document.getElementById("introText");
        const img = document.getElementById("introImage");
        const nextFactBtn = document.getElementById("nextFactBtn");
        nextFactBtn.innerHTML = `Next <i class="fa-solid fa-caret-right"></i>`;
        let numberOfQuestions = 3;//There are a minimum 3 questions, so this is the default
        switch (animal) {
            case "whale":
                img.src = "assets/images/whale-under-water.webp";
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
                img.src = "assets/images/cheetah-in-tree.webp";
                title.innerText = factsData.catFacts[factIndex].question;
                paragraph.innerText = factsData.catFacts[factIndex].fact;
                numberOfQuestions = factsData.catFacts.length;
                break;
            default:
                console.log(`${selectedAnimal} not an accepted case. nextFact() accepts whale, penguin, cat, axolotl`);
                break;
        }

        if (factIndex < numberOfQuestions - 1) {
            factIndex++;
        }
        else {
            factIndex = 0;// set index back to 0 to allow facts to loop and animate in navigation menu
            nextFactBtn.innerHTML = `Repeat <i class="fa-solid fa-backward-fast"></i>`;//change to repeat & arrow
            document.getElementById("navBtnDiv").classList.remove("hide");// button for the user to see (the menu button)
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
    /**
     * Shows and hides the navigation buttons with animation.
     * Uses GSAP for smooth transitions.
     */
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
            tl.from("#restartBtn", { opacity: 1, y: 55, duration: 0.5 })
                .from("#videoBtn", { opacity: 1, y: 110, duration: 0.5 }, "-=0.2")
                .from("#quizBtn", { opacity: 1, y: 165, duration: 0.5 }, "-=0.3")
                .from("#galleryBtn", { opacity: 1, y: 220, duration: 0.5 }, "-=0.4")
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
            tl.to("#restartBtn", { opacity: 1, y: 55, duration: 0.5 })
                .to("#videoBtn", { opacity: 1, y: 110, duration: 0.5 }, "-=0.2")
                .to("#quizBtn", { opacity: 1, y: 165, duration: 0.5 }, "-=0.3")
                .to("#galleryBtn", { opacity: 1, y: 220, duration: 0.5 }, "-=0.4")
            openMenu = false;//menu was open, set flag to false after hide animation and class
            //hide the buttons again!
        }
    }

    /**
     * Validates the string in the name entry box.
     * Rules: must be 3-10 letters, no spaces or special characters.
     */
    let name = "";
    function nameValidation() {
        const nameElement = document.getElementById("nameEntry");
        const nameTitle = document.getElementById("nameTitle");
        const nameHelp = document.getElementById("nameHelp");
        try {
            name = nameElement.value;
        } catch (error) {
            //prompt an entry to make > null
            nameHelp.innerText = "Please enter a name.";
        }
        let re = /[^A-Z-a-z]/g;//regular expression. Negated set - (true if does not include A-z)
        let nameValid = true;//assume entry is invalid till tested

        if (name.length < 3 || name.length > 10) {
            nameHelp.innerText = "Please use between 3 and 10 letters only."
        }
        else {
            nameValid = re.test(name);
            //illegal characters found...
            if (nameValid == true) {
                //get user to try again, show the rules
                nameHelp.innerText = "Please only use letters - no spaces or special characters";
            }
            else {
                //welcome the user to the quiz reveal the quiz section fully
                // quizContents(name);
                //hide the name entry div
                nameHelp.innerText = "";
                let tl = gsap.timeline();
                tl.to("#nameEntryDiv", {
                    opacity: 0,
                    x: -400,
                    scale: 0.8,
                    duration: 0.5,
                    ease: "back.out",
                    onComplete: () => {
                        document.getElementById("nameEntryDiv").classList.add("hide");
                        document.getElementById("quizForm").classList.remove("hide");
                        nameTitle.innerText = "Welcome, " + name;
                    }
                })
                    .from("#quizForm", {
                        x: -400,
                        duration: 0.5,
                        ease: "back.in"
                    })
            }
        }
    }

    let lastIndex = [];
    let correctAnswer;
    let score = 0;//used

    /**
     * Sets up and displays the next quiz question for the selected animal.
     * Tracks which questions have been shown and ends the quiz after 3 questions.
     */
    function quizContents() {
        document.getElementById("results").classList.add("hide");
        document.getElementById("quizForm").classList.remove("hide");
        document.getElementById("introDiv").classList.add("hide");
        document.getElementById("quizFeedback").classList.add("hide");
        const quizImg = document.getElementById("quizImg");
        const question = document.getElementById("questionP");
        const answers = document.getElementsByClassName("form-check-label");
        const quizElement = document.getElementById("popQuiz");
        quizElement.classList.remove("hide");//make visible
        let questionIndex = 0;
        let animalQuestions;

        switch (selectedAnimal) {
            case "whale":
                quizImg.src="assets/images/whales-feeding.webp";
                quizImg.alt="Whales feeding";
                animalQuestions = factsData.whaleQuestions.length;
                break;
            case "axolotl":
                quizImg.src="assets/images/pink-and-black-axolotls.webp";
                quizImg.alt="A pink and black axolotl in a tank"
                animalQuestions = factsData.axolotlQuestions.length;
                break;
            case "penguin":
                quizImg.src="assets/images/penguins-on-ice-field.webp";
                quizImg.alt="Penguins on an ice field";
                animalQuestions = factsData.penguinQuestions.length;
                break;
            case "cat":
                quizImg.src="assets/images/snow-leopard.webp";
                quizImg.alt="A snow leopard";
                animalQuestions = factsData.catQuestions.length;
                break;
            default:
                console.log(`${selectedAnimal} not an accepted case. quizContents() accepts whale, penguin, cat, axolotl`);
                break;
        }
        //to stop infinte while loop. if the length of lastindex is as long as the available number of questions, end the quiz
        //or set lastindex back to empty.
        if (lastIndex.length >= 3) {
            lastIndex = [];//set back to empty for the next time an animal is chosen or the quiz is run
            endQuiz(score);//end the quiz
            score = 0;
            return;
        }
        // if number is already present (question asked...). Used to pick unique questions
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
     * Checks the user's selected answer and provides feedback. if the label is same as json.answer,
     * the answer is correct, increase score
     * @param {HTMLInputElement} radioInput - The selected radio input element
     */
    function checkAnswer(radioInput) {
        const divFeedback = document.getElementById("quizFeedback");
        const feedback = document.getElementById("quizfeedbackP");
        const label = document.querySelector('label[for="' + radioInput.id + '"]');
        const labelText = label ? label.innerText.trim() : "";
        divFeedback.classList.remove("hide");

        if (labelText == correctAnswer) {
            //answer is correct - inform user
            feedback.innerText = "Well done, that was right!"
            score++;
        }
        else {
            //answer is incorrect - show user the correct answer
            feedback.innerText = `Oops! The answer was: ${correctAnswer}`;
        }
        //information on setTimeout: https://www.sitepoint.com/javascript-settimeout-function-examples/
        //keep the current state for 2 seconds before removing the message and calling next question via quizContents
        setTimeout(function () {
            feedback.innerText = "";
            radioInput.checked = false;
            quizContents();
        }
            , 2000);

    }

    /**
     * Ends the quiz, displays the user's score, and shows the results section.
     * @param {number} score - The user's score
     */
    function endQuiz(score) {
        document.getElementById("quizForm").classList.add("hide");//hide the quiz form, not the entire thing
        document.getElementById("results").classList.remove("hide");//show the results area
        document.getElementById("nameTitle").classList.add("hide");
        const resultHeading = document.getElementById("resultHeading");
        const resultP = document.getElementById("resultP");
        resultHeading.innerText = `Well done, ${name}!`;
        resultP.innerText = `You scored ${score} out of 3. Try the quiz again for different questions.`;
    }

    /**
     * Scales the size of image maps on an image to work with responsive elements.
     * @param {string} imgId - The id of the image to scale
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
     * data-attribute. Updates the coords for each area in the image map.
     * @param {number} ratio - The scaling ratio
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

    // Responsive image map scaling on load and resize
    const img = document.getElementById('imgSelect');
    if (img.complete) {
        imgAreaScaler('imgSelect');
    } else {
        img.addEventListener('load', () => imgAreaScaler('imgSelect'));
    }
    window.addEventListener('resize', () => imgAreaScaler('imgSelect'));

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
            { opacity: 1, y: '20vh', duration: 2, ease: "power1.out", },

        );
        tl.to("#introBanner", {
            opacity: 1, duration: 1, ease: "back.in"
        }, "-=1.5s")
        tl.from(".animalChoiceImg", {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: "back.out"
        });
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