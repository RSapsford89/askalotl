document.addEventListener("DOMContentLoaded", function () {
    // Grab all the elements which are .imgContainer img and attach click events
    const images =document.querySelectorAll(".imgContainer img");
    // console.log(images);
    images.forEach(img => {
        img.addEventListener("click", function() { 
            toggleImage(this); 
        });
    });
/**
 * Used to toggle opacity and show audio and image text
 * @param {HTMLElement} img 
 */
    function toggleImage(img){
        img.classList.toggle("imgOpacity");
        showDescription(img.nextElementSibling);//found at https://www.javascripttutorial.net/javascript-dom/javascript-siblings/
    }
/**
 * used to hide the div and pause the audio
 * @param {HTMLElement} div 
 */
    function showDescription(div){
        div.classList.toggle("hide");
        if(div.classList.contains("hide")){//if the div contains an audio element control it with .pause()
            const audio = div.querySelector("audio");
            audio.pause();
        }
    }
});
