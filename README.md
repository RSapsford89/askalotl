# askalotl
# A childrens encylopedic site about animals
## Project Goal

To create an interactive child friendly site about 4 different animals. The content will be aimed at Primary school aged children (aged up to 11 years) and should consist of a lot of colour and interactive elements to entertain and educate.

The information portrayed should be in an encylopedic style describing various aspects of each animal but be light hearted to keep it appropriate for the age:
* The anatomy / features
* The habitat
* It's diet
* Common species?
* Unusual features and characteristics

Outside of the animal information, there should be lots to draw in user to keep them entertained and  hopefully return. These could be:
* pop-quiz
* draw your own creature and have it follow the mouse
* interactive gallery with embedded YT links to videos, sounds, images in a carousel layout
* sounds play when mousing over certain objects like headings
* mousing over images causes them to animate in some way - grow, rotate, have something added to the edge like an animal holding it
* It should use bold colours and an inviting childlike font

## Code

### Code snippets used

#### Canvas drawing
The canvas drawing is based heavily on the example given by the MDN documentation about mousemove events and is found here: https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
The example code used supplies you with a canvas with a single color pen to draw with. The function colorPicker() was added to the implementation so the user can select from the RGB colour picker and a slider sets line thickness to make their creation colourful. This function simply has an <code>onclick="colorPicker()"</code> which then sets <code>context.strokeStyle</code> object and <code>context.lineWidth</code> object based on the value field in the colorPicker and slider elements. Another button is used to call a reset function <code>onclick="resetImg()"</code> to remove the src string for the image element and call a canvas method <code>context.clearRect(0, 0, myPics.width, myPics.height);</code> to redraw an empty canvas 

## Credits

* Favicon artwork was generated using Microsoft CoPilot AI and converted using favicon.io: https://favicon.io/
* JS animation tutorial and examples: https://javascript.info/js-animation
* copilot AI for generation of the animal text content for each animal's intro paragraph

# Burn After Reading

Can i find an JS animation which would make the transition of sliding right to left or left to right look like a page turn?