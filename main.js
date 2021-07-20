import changeElementBackgroundImage from "./javascript/displayimg.js";
import { puzzle } from "./javascript/puzzle.js";

const nav = document.querySelector('.navbar');
const container = document.querySelector('#container');

//Template array for each puzzles
let puzzleOne = ["a","b","c","d","e","f","g","h","empty"];
let puzzleTwo = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,"empty"];
let puzzleThree = ["left top","center top","right top","left center","center center","right center","left bottom","center bottom", "empty"];

//Track the current puzzle state
let curPuzzleState;

//Track current draggable tiles
let curDrag;

//Track the dragged tile
let srcTile;

//Call factory function on puzzleCommand variable
let puzzleCd = puzzle();

// When the page load
window.addEventListener('load',()=>{
    //variable that will keep track of puzzle state
    curPuzzleState = puzzleOne;
    //shuffle puzzle(shuffle the array)
    puzzleCd.shufflePuzzle(curPuzzleState);
    //Create puzzle
    puzzleCd.createPuzzle(puzzleOne);
    //Resize container
    puzzleCd.resizePuzzleContainer(3);
    //Sort draggable Tiles
    curDrag = puzzleCd.sortDrag(curPuzzleState);
    //Attribute draggable status to respective tiles
    puzzleCd.attributeDrag(curDrag);
});

//Event listener on the navbar
nav.addEventListener('click',(e)=>{
    let btnId = e.target.id;
    switch(btnId){
        case "puzzle1":
            //reset puzzle container
            puzzleCd.resetPuzzle();
            curPuzzleState = puzzleOne;
            puzzleCd.shufflePuzzle(curPuzzleState);
            puzzleCd.createPuzzle(puzzleOne);
            puzzleCd.resizePuzzleContainer(3);
            curDrag = puzzleCd.sortDrag(curPuzzleState);
            puzzleCd.attributeDrag(curDrag);
            hideBtn();
            break;
        case "puzzle2":
            puzzleCd.resetPuzzle();
            curPuzzleState = puzzleTwo;
            puzzleCd.shufflePuzzle(curPuzzleState);
            puzzleCd.createPuzzle(puzzleTwo);
            puzzleCd.resizePuzzleContainer(4);
            curDrag = puzzleCd.sortDrag(curPuzzleState);
            puzzleCd.attributeDrag(curDrag);
            hideBtn();
            break;
        case "puzzle3":
            puzzleCd.resetPuzzle();
            curPuzzleState = puzzleThree;
            puzzleCd.shufflePuzzle(curPuzzleState);
            puzzleCd.createImgPuzzle(puzzleThree,puzzleCd.selectImg());
            puzzleCd.resizePuzzleContainer(3);
            curDrag = puzzleCd.sortDrag(curPuzzleState);
            puzzleCd.attributeDrag(curDrag);
            showBtn();
            break;
    }
})

//disable the default behavior of the browser when dragging
document.addEventListener("dragover", (e)=>{
    e.preventDefault();
  });

//Event listeners for tiles inside container
container.addEventListener("dragstart",(e)=>{
    srcTile = e.target;
})

//Event listeners for droped tile
container.addEventListener("drop", (e)=>{
    let dropZone = e.target;
    //For puzzle 1 and 2
    if(dropZone.classList == "empty"){
        dropZone.innerHTML = srcTile.innerHTML;
        dropZone.classList.remove("empty");

        srcTile.classList.add("empty");
        srcTile.innerHTML = "";

        //Update puzzle array
        curPuzzleState = puzzleCd.getPuzzleState();

        //Update draggable tiles;
        curDrag = puzzleCd.sortDrag(curPuzzleState);

        //Update draggable status to respective tiles
        puzzleCd.attributeDrag(curDrag);
    }
    //For puzzle3
    else if(dropZone.classList == "emptyImg"){
        dropZone.classList.remove("emptyImg");
        dropZone.style.background = `${srcTile.style.backgroundImage} ${srcTile.style.backgroundPosition} / ${srcTile.style.backgroundSize}`;

        srcTile.style.background = "none";
        srcTile.classList.add("emptyImg");

        curPuzzleState = puzzleCd.getPuzzleState();

        curDrag = puzzleCd.sortDrag(curPuzzleState);

        puzzleCd.attributeDrag(curDrag);
    }
})

//Check if puzzle is correct
function isCorrect(solution, content) {
    if(JSON.stringify(solution) == JSON.stringify(content)) {
        return true;
    } else {
        return false;
    }
}

//For modal
gameModal = document.getElementById("gameModal");
const modal = document.getElementById("modal");
const message = document.getElementById("message");

function showModal() {
    message.innerText = "Winner!";
    modal.classList.remove("hide");    
}

function hideModal() {
    modal.classList.add("hide");
    gameModal.classList.add("hide");
}

//Event listener on the gameModal
gameModal.addEventListener('click',(e)=>{
    let btnId = e.target.id;
    switch(btnId){
        case "puzzle1":
            //reset puzzle container
            puzzleCd.resetPuzzle();
            curPuzzleState = puzzleOne;
            puzzleCd.shufflePuzzle(curPuzzleState);
            puzzleCd.createPuzzle(puzzleOne);
            puzzleCd.resizePuzzleContainer(3);
            curDrag = puzzleCd.sortDrag(curPuzzleState);
            puzzleCd.attributeDrag(curDrag);
            hideBtn();
            hideModal();
            break;
        case "puzzle2":
            puzzleCd.resetPuzzle();
            curPuzzleState = puzzleTwo;
            puzzleCd.shufflePuzzle(curPuzzleState);
            puzzleCd.createPuzzle(puzzleTwo);
            puzzleCd.resizePuzzleContainer(4);
            curDrag = puzzleCd.sortDrag(curPuzzleState);
            puzzleCd.attributeDrag(curDrag);
            hideBtn();
            hideModal();
            break;
        case "puzzle3":
            puzzleCd.resetPuzzle();
            curPuzzleState = puzzleThree;
            puzzleCd.shufflePuzzle(curPuzzleState);
            puzzleCd.createImgPuzzle(puzzleThree,puzzleCd.selectImg());
            puzzleCd.resizePuzzleContainer(3);
            curDrag = puzzleCd.sortDrag(curPuzzleState);
            puzzleCd.attributeDrag(curDrag);
            showBtn();
            hideModal();
            break;
    }
})

//For changeImg Buttons
const prevImg = document.getElementById("prevImg");
const nextImg = document.getElementById("nextImg");
const imageArray = ["../images/brian-mcgowan-NAJa5rRgwDE-unsplash.jpg", 
"../images/david-becker-dMeEJRE18VI-unsplash.jpg", 
"../images/nick-fewings-y-xqEZPA6KQ-unsplash.jpg", 
"../images/daniels-joffe-wWTow3BNoCs-unsplash.jpg", 
"../images/erik-mclean-OQgpRHFJwbQ-unsplash.jpg", 
"../images/sasha-stories-r5sWUXSgEfg-unsplash.jpg", 
"../images/brandon-nelson-2smDZopBMso-unsplash.jpg", 
"../images/luis-mejicanos-aaqBs1zDeyA-unsplash.jpg", 
"../images/reno-laithienne-CwJP_8mKvTo-unsplash.jpg"];

//Show buttons when puzzle3 is active
function showBtn() {
    prevImg.classList.remove("hideBtn");
    nextImg.classList.remove("hideBtn");
}

function hideBtn() {
    prevImg.classList.add("hideBtn");
    nextImg.classList.add("hideBtn");
}

//Change Image on click
let li = document.getElementById('container').getElementsByTagName('li');
console.log (li);

nextImg.addEventListener("click", function () {
    nextImage();
    
});

prevImg.addEventListener("click", function () {
    prevImage();
});

function getNextImg(currentImg){
    let imgIndex = imageArray.indexOf(currentImg)
    if(imgIndex == imageArray.length - 1){
        return imageArray[0];
    }
    else{
        return imageArray[imgIndex + 1];
    }
}

let nextImage = () => {
    // This is a ternary operator(the same things as an if else loop). It will check if a backgound image doesn't exist, if it doesn't exist it will parse the last item of the imageArray to get the first imageArray item. Else it will parse the current backgound img and it will return the next img. 
    let image = !li[0].style.backgroundImage ? getNextImg(imageArray[imageArray.length - 1]) : getNextImg(li[0].style.backgroundImage.split("\"")[1]);
    
    for(let i=0; i < li.length; i++){
        li[i].style.backgroundImage = `url(${image})`;
        li[i].style.backgroundPosition = puzzleThree[i];    
    }
};