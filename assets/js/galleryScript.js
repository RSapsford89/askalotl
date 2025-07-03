document.addEventListener("DOMContentLoaded", function () {
    // Grab all the elements which are .imgContainer img and attach click events
    const images =document.querySelectorAll(".imgContainer img");
    // console.log(images);
    images.forEach(img => {
        img.addEventListener("click", function() { 
            toggleImage(this); 
        });

    });

    function toggleImage(img){
        console.log(img.alt);
        img.classList.toggle("imgOpacity");
        showDescription(img.nextElementSibling);//found at https://www.javascripttutorial.net/javascript-dom/javascript-siblings/
    }

    function showDescription(div){
        div.classList.toggle("hide");
    }
});

    
