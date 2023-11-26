//!getting and setting elements and colour needed
const boxes = document.querySelector(".boxes");
const colors = [
    "aqua",
    "red",
    "yellow",
    "green",
    "blueviolet",
    "pink",
    "orange",
    "blue"
];
const colorList = [...colors,...colors]
//console.log(colorList);
const boxLength = colorList.length;
//console.log(boxLength);
//!initializing the main element of the game state
let revealCount = 0;
let activeBox = null;
let waitingTime = false;
//!function to display the boxes in the webpage
function buildBoxes(color){
    const element = document.createElement("div");
    element.classList.add("box");
    element.setAttribute("data-color",color);//! used for mapping the color
    //!adding event listeners for clickevent
    element.addEventListener("click",()=>{
        if(waitingTime){
            return
        }
        element.style.backgroundColor = color;
    })
    return element;
}

//!Building the boxrs for the game
for(let i=0; i<boxLength;i++)
{
    //! this is the place where the colors are randomly displayed
    const randomIndex = Math.floor(Math.random() * colorList.length)
    const color = colorList[randomIndex];
    const box = buildBoxes(color);

    //! using splice method to avoid 3 repeated cells
    colorList.splice(randomIndex,1)
    //console.log(color);
    boxes.append(box);
}