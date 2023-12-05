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
    element.setAttribute("data-revealed","false");//! used to check revealed boxes
   
   
    //!adding event listeners for clickevent
    element.addEventListener("click",()=>{
        const revealed =element.getAttribute("data-revealed");

        //!display the boxes and Checking for reveal and checking the current element
        if(waitingTime || revealed === "true" || element===activeBox)
        {
            return
        }
        element.style.backgroundColor = color;
       
        //!checking the active box
        if(!activeBox){
            activeBox = element
            return;
        }
        //console.log(activeBox);
        
        //! Logic for matching color and Winning Condition
        const colorMatch = activeBox.getAttribute("data-color");
        if(colorMatch === color)
        {
             activeBox.setAttribute("data-revealed","true");
             element.setAttribute("data-revealed","true");
             
            waitingTime=false;
            activeBox=null;
            revealCount +=2 ;

            if(revealCount===boxLength)
            {
                alert("Congratulations!💐You won!🥳Refresh the Page to Play Again🤩");
            }
        return;
        }






        //!change the waiting time to true and using settimeout for transition
        waitingTime = true;
        setTimeout(()=>{
            element.style.backgroundColor = null;
            activeBox.style.backgroundColor = null; waitingTime = false;
            activeBox = null;
         },2000);
           
    })
    return element;
}

//!Building the boxes for the game
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

