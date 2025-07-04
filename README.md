# askalotl

# A childrens encylopedic site about animals

![am I responsive screenshot](/readme/image-2.png)

https://rsapsford89.github.io/askalotl/

## Project Goal

To create an interactive child friendly site about 4 different animals. The content will be aimed at Primary school aged children (aged up to 11 years) and should consist of a lot of colour and interactive elements to entertain and educate.

The information portrayed should be in an encylopedic style describing various aspects of each animal but be light hearted to keep it appropriate for the age:

- The anatomy / features
- The habitat
- It's diet
- Unusual features and characteristics

Outside of the animal information, there should be lots to draw in user to keep them entertained and hopefully return. These could be:

- pop-quiz
- draw your own creature and have it follow the mouse
- interactive gallery with embedded YT links to videos, sounds, images in a carousel layout
- sounds play when mousing over certain objects like headings
- mousing over images causes them to animate in some way - grow, rotate, have something added to the edge like an animal holding it
- It should use bold colours and an inviting childlike font

## User Stories

who, why, because...
Visitors are generally expected to be children or parents / carers of young children.

#### New Visitor

1. As a new visitor I want to learn quick facts about a variety of animals for Primary School aged children (up to 11yrs) because of a school topic.

- The site needs to provide a quick way to learn about the animals covered in a child friendly way and should incorporate a pop-quiz to cement learnings. The site UX and content needs to be aimed at Primary School aged children.

2. As a Carer I want a site which quickly covers some learning about animals where I can find some general information to join in with the child's interest in the animal kingdom but also provide some more in depth reading to expand my child's interest and knowledge.

- The site should have a section dedicated to learn quick facts, but also contain some further reading which may contain more detail about each animal (2 to 3 additional facts about specifics such as habitats, food, species, endagered status). As this user is likley an adult, the playful side should be able to be disabled such as sounds and over the top animations.

3. As a Carer I want a space for my child who is interested in animals to casually learn more about them but also provide further entertainment to keep them occupied.

- The site needs to provide an educational and entertainment side. Quick fact and pop-quiz teach the user, whilst interactive elements such as a drawing mini-game and cursor follower, sounds, videos and animations should keep the user occupied!

#### Returning Visitor

1. As a returning visitor I want to learn about a different animal but still enjoy the same level of content as on my first visit because I have an interest in animals.

- The content styling, layout and quality of information should be consistent throughout the 4 animals.

2. As a returning visitor I want to learn about the remaining animals, but do not want to be distracted by all of the animations and sounds.

- A quiet mode should be incorporated. A sticky button should be pressed which will mute the audio and reduce animations across the site.

3. As a returning visitor I want to view this site on a different device because I want to view the content on a tablet screen or laptop

- The page needs to be responsive up to laptop sized screens. A gallery page should have masonry style layout which scales for the screen size. The main page should employ good UX layout to make use of extra space.

#### Frequent Visitor

1. As a frequent visitor I want to find more/different content to learn about the animals and find entertaining content.

- The pop-quiz needs to show a limited number of questions from a bank of randomly selected questions so the user has some varying content. The drawing is intended to be free draw and should have different pen colour and thicknesses. A gallery of video, sounds and pictures should be interactive to encourage the user to interact and return.

2. As a frequent visitor I want to see images of the animals because I want to see how different animals and species look.

- There should be a gallery page with a broad selection of images for the user to see different animals and species.

3. As a frequent visitor I want to be able to personalise my experience and see how well I do on the quiz.

- At the start of the quiz section the user should be prompted to enter a name and at the end, report how many questions were completed correctly.

4. As a frequent visitor who enjoys the quiz I want to know the correct answers to any questions I get wrong.

- The quiz needs to give feedback on incorrect answers - informing the user of the correct choice.

### Minimum Viable Product

The MVP for the project was determined to be a site which consists of the following features:
|feature|Essential for MVP|
|:---:|:----:|
|Colourful with animations| Y|
|Information easy to digest|Y|
|Quick Fact section|Y|
|Large bank of facts for further learning|Y|
|Language aimed at Primary school age|Y|
|Silent mode|N - main page will have no sounds or excessive animations except for a youtube video modal|
|Video on selected animal|Y|
|Drawing section|N - nice to have|
|Cursor follower|N - nice to have|
|Gallery page with broad range of imagery|Y|
|Gallery page to include audio|N - nice to have|
|Site must be responsive|Y|
|Quiz section with multiple choice|Y|
|Quiz to display random questions from larger bank of questions|Y|
|Quiz section prompts user for a name|Y|
|Education section split from entertainment|Y|
|Further reading|N - nice to have, but footer should contain links to external charity and educational sites|

The features not being developed are the Drawing and cursor sections, silent mode (as the page will no longer have sounds on the main page and the gallery page will control interactions directly). So as to not be too overwhelming the sounds will not be present except for in videos controlled in a modal, and sounds exclusively selected in the gallery page. User Story feature requests implemented are:
* UX and design is simple, colourful and easy to navigate. Content is added incrementally with minimal clutter.
* UX is consistent throughout the animals with bold colours and imagery being the visual differences.
* A quiz which randomly selects from a JSON file to populate questions is fully implemented and each run of 3 questions are unique
* A user can enter a name before the quiz and this is used to personalise the displayed content
* The quiz informs the user on each question whether they were right or wrong. Wrong answers get immediate feedback and the score is shown out of 3 at the end
* A Masonry style gallery page is implemented with a carousel at the top. Pressing an image reveals the image title and an audio element which can be played. This auto-pauses when you click the image again
* A large bank of animal facts is available to read through as a return used in the Fact area and completing more quizzes will reveal different questions
* Embedded Youtube video in a modal plays a video about the selected animal - closing the modal pauses the video
* The gallery page has images of different species of the animals for visitors to see and explore
* The page is fully responsive up to laptop size screens on the home and gallery pages
* A user is able to choose another animal at any point if they want to consume more fact data about all the animals without completing a quiz


## Wireframes
![mobile wireframe](readme/mobile-wireframe.jpg)

![tablet wireframe](readme/tablet-wireframe.jpg)
## Code

## Landing Page/Area

This utilises Bootstrap's d-flex and absolute positioning combined with JS and GSAP for animations. By hiding elements and placing them over the top of one another, animations can be used to create interactive animations. The main H1 'Welcome to Askalotl' is clickable and will make it disappear. On completion, this then animates in the image and imageMap which is used for selecting your animal. At the same time, a banner moves in from the bottom to give you a brief site description and what to expect.
The falling text is caused by using the GSAP animation from:

```
gsap.registerPlugin(SplitText);

gsap.set("h1",{opacity:1});

let split = SplitText.create("#headingTitle", {type:"chars"});

let tl = gsap.timeline();
// falling letters using stagger and the above string split
tl.from(split.chars,{
    y:20,
    autoAlpha:0,
    stagger:0.05,
});
```

This takes the characters in the heading title, splits them into chars and then the stagger method is used to make sequential `from` animations to make them look like falling letters.
Scaling of the image map to fit the image is done through the functions `imgMapScaler` and `imgAreaScaler` which uses the previous screen size and new size to create a ratio to multiply the co-ordinates with. A higher ratio means a larger grid. 

## Facts
The fact section is set depending on the animal selected in the landing page area. `animalSelection` sets the Facts section element content. A switch statement checks the value of `animal` and reads the data objects in the JSON file. Each parent object represents each animal and each animals quiz questions. For example `whaleFacts` contains objects which are used to set a heading ("question") and the fact paragraph content ("fact").
```
    {
      "animal": "Whales",
      "question": "what do whales eat?",
      "fact": "Baleen whales (with big comb bristles for teeth) eat Plankton, Krill and other crustaceans. Whilst toothed Whales eat squid and fish as well."
    },
```
An image, title and p element are displayed and then a large button to indicate to the user to get another fact. The UX is clean and simple to make it easy to navigate. Once the user has gone through all of the available facts, the button changes to say "repeat" and a menu button appears for navigation. The following 3 images show the stages:
![fact area start](readme/fact-area-start.jpg)
![fact area repeat](readme/fact-area-repeat.jpg)
![fact area with menu open](readme/fact-area-menu.jpg)


## Pop Quiz

The pop Quiz will contain a place to enter your name, image, a question and 3 answers to choose from. 


The user will choose from a radio button which links the 3 answers so only can be picked. This is then compared against the answer from the JSON and marked as right or wrong. Wrong answers will show the user the correct answer. The facts will be in a separate file and formatted as `object of objects`. This allows the site host to update the facts and questions without requiring a HTML or JS change. The questions will be randomly chosen from the object of object for the animal selected at the start of the site interactions and consists of 3 questions each time. At the end of the quiz, the user is given feedback. Upon starting the quiz, the user can choose to enter a name which is then displayed to them. The relevant functions are `quizContents`, `nameValidation`, `endQuiz`.

```
const whaleFacts = {
	fact1:{
		animal:"whale",
		question:"where do they live?",
		multiAnswer1:"In the Oceans and Seas",
		multiAnswer2:"In the mountains",
		multiAnswer3:"In the sky",
		answer:"In the Oceans and Seas"
	}, ... fact2:{with further contents...}
}
```
The difficulty associated with getting the quiz to run as intended was in accessing the JSON, finding the questions length and ensuring you do not use the same index when selecting the question to display. A while loop was first tested but it was found that the code would not generate a new value each time it entered the while loop. A little research showed the correct method would be `do while` for JavaScript. I tested this on an online compiler, Programiz. The implemented code is based on this:

```
let lastindex=[];
let animalquestions=6;
let questionindex=Math.floor(Math.random() * animalquestions);
for(let i=0; i<10; i++){
    //console.log(questionindex);
    do{
        questionindex=Math.floor(Math.random() * animalquestions);
    }
    while(lastindex.includes(questionindex))

    console.log(`index: ${questionindex}`);
    lastindex.push(questionindex);
    console.log(`Array index ${lastindex[lastindex.length-1]}`);


}
```

output on Programiz: ![unique random value for questions](/readme/image.png)

To check the answers, the function `checkAnswer()` takes the value in `correctAnswer` from the JSON and compares it to the radio button text. I decided to use the `this` keyword so any radio could be pressed and the label text passed to it. The solution used a code suggestion from AI as the implementation I worked on could not run correctly with the `this` keyword. AI's code snippet is in the Code snippet section.

The name is validated using JS with a regex query in the `nameValidation` function. This function checks for a null entry (no text entered) and then uses negated query so that any string which contains characters other an A-Z and a-z returns true. If `nameValid = true` then a helper text shows underneath the text box to prompt a new name.

![alt text](readme/name-feedback.jpg)

The images below show stages within the quiz:

![quiz start](readme/quiz-start.jpg)![wrong answer entered](readme/quiz-wrong-answer.jpg) ![alt text](readme/quiz-name.jpg) ![alt text](readme/end-of-quiz.jpg)

## Menu navigation
Navigation through the site is led by button interactions. A dedicated button in the fact area to progress through facts in the same space, a quiz with automated progression upon selecting answers and finally the menu buttons for viewing the Video, Animal selection, Gallery link and Quiz. The menu only appears once the user has viewed all the facts for their chosen animal to encourage reading through the content. It has it's position set to fixed in the bottom left corner and is animated using GSAP to draw attention to the new element which has appeared. The function which controls expanding the menu is `showHideMenu` which removed the `hide` class, animates the buttons up to their respective positions and does vice-versa to hide them again. In line JS is used to manage `href` locations within the buttons.

## Gallery
The gallery page is a based on a previous project (code in code snippets below). This page also uses a bootstrap carousel with some custom styling to ensure images stay centered and show no additional text. The gallery design is a masonry style with additional click functions. When the user clicks on any image the opacity reduces, relevant text appears and also audio control which is set to play either Cat, Penguin, Whale or Axolotl (the sound of caves as they are silent!). If the user clicks again, the image returns to normal. The gallery JS is in it's own script file to reduce the amount of code being in one file. `toggleImage` and `showDescription` control element visibility and `eventListeners` are added to every gallery image. AI was consulted to get the `this` property inserted at the correct point in the function.
Gallery images on different devices:

![mobile gallery](readme/mobile-gallery.jpg) ![tablet gallery](readme/tablet-gallery.jpg) ![alt text](readme/laptop-gallery.jpg)

### Code snippets used


#### Changing element visibility

The function `animalSelection()` used the w3schools information on CSS element visibilty: https://www.w3schools.com/css/css_display_visibility.asp to create the JS style manipulation line `paragraph[x].style.display="none";` and also takes some inspiration in the form of the map below which is in adapted in the html to create the 4 sections on the pixel art image used to select your animal.

```
<map name="workmap">
  <area shape="rect" coords="34,44,270,350" alt="Computer" href="computer.htm">
  <area shape="rect" coords="290,172,333,250" alt="Phone" href="phone.htm">
  <area shape="circle" coords="337,300,44" alt="Coffee" href="coffee.htm">
</map>
```

#### Quiz section

The layout for the quiz section uses BootStrap's Radio buttons. This was found in the docs: https://getbootstrap.com/docs/5.3/forms/checks-radios/#radios and the example code to base development on was:

```
<div class="form-check">
  <input class="form-check-input" type="radio" name="radioDefault" id="radioDefault1">
  <label class="form-check-label" for="radioDefault1">
    Default radio
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="radioDefault" id="radioDefault2" checked>
  <label class="form-check-label" for="radioDefault2">
    Default checked radio
  </label>
</div>
```

An AI suggested solution for the `checkAnswer` function was:

```
 const label = document.querySelector('label[for="' + radioInput.id + '"]');
    const labelText = label ? label.innerText.trim() : "";
    // Use labelText for answer checking
    console.log(labelText);
```

#### Carousel implementation

The Carousel implementation is based heavily on the following snippet from the BS5 docs: https://getbootstrap.com/docs/5.3/components/carousel/#how-it-works

```
<div id="carouselExampleCaptions" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="..." class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
```

#### Gallery layout

The Gallery page employs a CSS grid layout. This is taken largely from a previous project and is based upon this code from the "A Walk In the Park" project:https://github.com/RSapsford89/a-walk-in-the-park/blob/main/assets/styles/styles.css

```
/* masonry container */
.gallery-masonry {
  column-count: 3; /* Default: 3 columns display for lg*/
  column-gap: 1rem; /* Gap between columns */
}
/* masonry items ideas taken from Boostrap demo and Desandro for use of overflow,
positions and column-counts*/
.gallery-item {
  position: relative;
  break-inside: avoid;
  overflow: hidden;
  margin-bottom: 1rem;
}
.gallery-item img {
  width: 100%; /* Full width of the column */
  height: auto; /* Maintain aspect ratio by letting height scale */
  display: block; /* Remove inline spacing */
}
```
#### auto pause video in modal
This code snippet is based on the youtube docs, JS doc and an AI response to correct the api string
https://developers.google.com/youtube/iframe_api_reference#Functions
```
if (frame.src.includes("youtube.com/embed")) {
                        frame.contentWindow.postMessage(
                            '{"event":"command","func":"pauseVideo","args":""}',
                            '*'
                        );
```
#### Navigating to href's smoothly and using JS

On selecting an animal, `animalSelection` proceeds to navigate smoothly to the `displaySection`. The CSS property to use smooth scrolling was found here: https://www.w3schools.com/howto/howto_css_smooth_scroll.asp#section2
To control window navigation in JS I viewed this stackoverflow question and looked for more detail in the JS documentation:

- https://stackoverflow.com/questions/1226714/how-to-get-the-browser-to-navigate-to-url-in-javascript
- https://developer.mozilla.org/en-US/docs/Web/API/Window/location
- https://developer.mozilla.org/en-US/docs/Web/API/Location
  This shows that the code `window.location.href = 'hrefName';` can be used in animalSelection after the content has been set and move to the page area.

#### RegEx for name validation

The function `nameValidation` uses a regular expression to truthy test a string. It will return true if any of the negated values present. This means any character which is not A-Z, a-z. If it returns true, the user is prompted to enter another name. This information was a combination of the JS docs `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions` for RegEx and the use of `https://regexr.com/` to build and validate the expression for easier testing.

#### Custom 404 redirect
 Reading the Github Pages docs https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site notes all you need is a page in your root directory named 404.html. Searching for custom 404 pages suggested having a title, custom image, relevant styling for the project and a 'go home' button to navigate back.
## Testing


|Element tested|Test method|Result|
|:------------:|:---------:|:-----:|
|Welcome button|click animated title|animation continues and shows imgSelect and is responsive|
|imgSelect map|click on each animal and different sizes|appropriate animal fact section opens responsive to screen changes|
|Fact button|check function including when animal changes|changes page contents to next fact and functions if page size changed and if animal is changed. Says 'repeat' at the end and goes back to 'next' if pressed again|
|Menu button|made visible once an animals facts have been shown and works at different screen sizes| works at different sizes and once button changes to 'repeat'|
|Menu - New Animal|click at different sizes|smooth scroll to top of page 'imgSelect' and user can select again|
|Menu-Video|click and test video modal shows|Modal appears at correct size across page widths|
|Youtube Modal|Video runs|Video runs, some devices require user sign in by clicking through the video. Does not auo-pause|
|Menu-Quiz|button click loads quiz contents and name entry|Facts hide, quiz and name entry show.|
|Name validation|Validate with null entry|Helper text warning displays 'please use between 3 and 10 letters only'|
|Name validation|Validate with numbers entry|Helper text displays 'please only use letters - no spaces or special characters'|
|Name validation|Validate with special characters|Helper text displays 'please only use letters - no spaces or special characters'|
|Name validation|enter valid length name|Quiz repositions, Title at top says 'Welcome, abc' (the entered name)|
|Quiz|pick answers to check 3 questions are asked|3 questions are asked. Results page displays|
|Menu-Quiz|second quiz click loads a new quiz|New quiz loaded with new questions|
|Quiz score|answer questions check result matches progress| score correct based on feedback|
|Quiz random questions|run several times check different questions are asked| ran 3 times for a total of 7 different questions|
|Gallery display|check for responsive display at different sizes|single column on mobile, 2 columns on tablet size and 3 on laptop size screens|
|Gallery image clicks|check for opacity and text with audio controls display| Across all sizes any clicked image's opacity changes and an audio control and image description appears. Clicking again makes it hide|
|Gallery carousel|carousel buttons work, images change, responsive| arrow buttons work, tab buttons work, images scroll smoothly, works at all screen sizes|
|Gallery Back button|press button, redirect to home page|pressing the button takes you back to a refreshed home page|
|Custom 404 page|break link and expect navigation to redirect to the 404 page| https://rsapsford89.github.io/askalotl/inex.html (removed the 'd') does re-direct to 404.html which is the github pages standard redirect name|

### Code validation

All code was run through appropriate HTML/CSS/JS validators. The validators used were:
HTML: https://validator.w3.org/nu/
CSS: https://jigsaw.w3.org/css-validator/validator#css
JS: https://validatejavascript.com/ 

#### HTML
This picked up several errors. These were the placement of `href` attributes in places which are not 'allowed' and missing `href` in the `area` tags. To resolve the `area` tags `href="#"` was added. Illegal placement of `href` were moved to `a` tags.
![index html pass](readme/indexHtmlValidator.jpg)

The Gallery html page had some unclosed tags which were readily fixed.
![gallery html pass](readme/galleryHtmlValidator.jpg)

#### CSS
Upon validating the CSS I found a few repeated IDs and unused classes which removed and tidied up. The files then passed the validator tests:
![css validator pass](readme/cssValidator.jpg)

#### JS
When putting the JS code through a linter numerous issues were found - missing semicolons being the main issue and using the incorrect comparison in `if` statements (`==` instead of literal `===`). The Gallery file was able to pass after debugging:
![gallery JS pass](readme/galleryJsValidator.jpg)

But for the main script 2 errors remain - an unexpected `addEventListener` which is used to wait for the DOM to finish before loading and error of parameter re-assignment `radioInput` which is used to read the radioInput states and set to unchecked for the next quiz question.

![script JS](readme/indexJsValidator.jpg)

#### Lighthouse 

Performance for this project is only at 88. However animations which take time to fade in and our affect the score in a negative way. The LCP is marked as the pixel art whale on the title CTA but these do not load until 2 seconds after the page content has loaded all DOM components. Every image is in the webp format and of a small size. I feel this is further validated due to the fact that the Gallery page scores 100 on performance, yet has considerably more imagery to load and place.

Gallery lighthouse report:
![gallery lighthouse report](readme/galleryLighthousePass.jpg)

Homepage lighthouse report:
![homepage lighthouse report](readme/indexLighthouse.jpg)

#### WAVE

Unforunately due to the number of animations which the site runs to achieve an engaging level of content for children to interact with means the WAVE catches text as they transistion from being opaque to transparent. Due to this they then fail for contrast measurements.
Wave results:
![wave contrast failures](readme/wave-failures.jpg)
Colours and fonts were picked to be of sufficient contrast before animating using color pickers and it can be seen that the beginning of the animation has the required contrast level before a reading must be being made.
## Deployment
The development and deployment of this project has been completed using GIT and Github. The IDE used was VS code. Github Pages was used to deploy the site and deployment of the site was done early in development to capture feedback to drive development in the right direction. To deploy the page you navigate to the project page and then: "settings", set "default branch" to `main`, navigate to "pages", "deploy from a branch" and publish the site. Everytime subsequent updates are  pushed to the *main* branch, the public site is updated. Several branches were created to test different layouts following feedback and the GSAP animations without affecting the main branch. Once the features were deemed good, they were merged back in to the main.


### Bugs and fixes

During early testing of animations and the function `animalSelection(animal)` I found that not all elements would be correctly set to `display="none"` after some DevTool debugging I realised I had not set the `for loop` variable to 0.

When updating the canvas drawing events to use pointer events instead of mouse, the page would respond to scrolls after very short movements. Adding `e.preventDefault();` was expected to stop the default interactions with the page but it did not resolve the bug. After searching for JS fixes I investigated CSS fixes and found the `touch-action` within a MDN quote for a related stackoverflow question: https://stackoverflow.com/questions/38958354/explain-situation-when-you-might-use-touch-action-manipulation
Adding `touch-action: none` resolved the issue and the canvas worked correctly.

When implementing the embedded videos from YouTube(YT), I encountered an issue when trying to follow the google documentation (https://developers.google.com/youtube/player_parameters). The documentation clearly states that the link should be www.youtube.com/*embed*/VIDEO_ID but when you go to the website and pull the link from the Share icon it will be similar to: https://youtu.be/Nc9MHI4zSLI?si=B8cQpqpCTuK8dV6s . The link is entirely different and would produce a crossorigin error, which is related to requesting content from a site other than the hosting sites location. To work around this issue I took the normal link in the browser and replaced `/watch?v=` with`/embed/` which allows the player to run.

The imageMap would be present before the image animation and therefore can be unknowingly pressed. Tried adding a disable attribute in CSS but this didn't block mouse interactions properly. The fix used was to disable the content through `style.display="none"` and enable it once the heading has been pressed.

During development a JSON file was created to contain all the facts and quiz questions. JS is used to read the file and populate an object with that data for use. At this point I realised `animalSelection()` needed to be refactored to follow a similar approach which led to HTML, CSS and JS changes. There were multiple fixes required - changing classes and IDs, ensuring each element now had one ID when changed from a class, changes to JS to read ID instead of classes.

When trying to resolve some mobile view formatting issues regarding the `introDiv` CSS and BootStrap sepcificity would clash. This area needs the d-flex to position the button at the bottom of the Div to stop it moving around, but this BootStrap style is more specific than CSS. Had to use `!important` on the `.hide` class to ensure hidden components do not get overriden.

During the creation of the Quiz results screen a bug which did not correctly set the score back to 0 (for repeat turns) meant the score kept increasing as below:![alt text](image-1.png)
This was due to object scope. `score` could not be set to 0 in `endQuiz` and had to be set to 0 in `quizContents`.

In validation the `index.html` failed due to using the `a` tag with button attribute which does not exist - looking for alternate solutions meant changing them to a `button` and using `onclick` with inline JS.

Currently there are several errors which appear in the console of the browser, however I have been unable to reduce them and searching for solutions suggests they are out of the project scope. The errors are reports from google/youtube and a permissions violation outside of the code created for this project. The `deprecated` warnings are related to youtube videos too:
![remaining errors](readme/remaining-errors.jpg)

When attempting to use WAVE for accessiblity I found no way of getting animations to be ignored and so contrast errors display *as they are animated into place from low to high opacity* - clearly this would mean a failure at the point of the animation being more transparent than opaque.

## Credits

- Favicon artwork was generated using Microsoft CoPilot AI and converted using favicon.io: https://favicon.io/
- JS animation tutorial and examples: https://javascript.info/js-animation
- copilot AI for generation of the animal text content for each animal's intro paragraph
- For quick Git command reminders for branches and merges etc: https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow
- GSAP for animation library: https://gsap.com/
- W3 schools for some quick references for HTML elements such as: https://www.w3schools.com/html/html_youtube.asp
- Penguin sounds came from free sound library: https://www.freesoundslibrary.com/penguin-noise/
- Whale, Cat and cave (Axolotls are silent!) sounds came from pixabay: https://pixabay.com/sound-effects/search/
- Whale info found on: https://oceaninfo.com/compare/blue-whale-size-comparison/
- https://regexr.com/ for regex pattern testing
- For testing pieces of JS code outside of the project site Programiz was used: https://www.programiz.com/javascript/online-compiler/
- Pexels for royalty free images: https://www.pexels.com/search/whales/
- chatGPT to rapidly add missing ARIA labels: https://chatgpt.com/



