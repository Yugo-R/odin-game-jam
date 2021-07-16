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
            break;
        case "puzzle2":
            puzzleCd.resetPuzzle();
            curPuzzleState = puzzleTwo;
            puzzleCd.shufflePuzzle(curPuzzleState);
            puzzleCd.createPuzzle(puzzleTwo);
            puzzleCd.resizePuzzleContainer(4);
            curDrag = puzzleCd.sortDrag(curPuzzleState);
            puzzleCd.attributeDrag(curDrag);
            break;
        case "puzzle3":
            puzzleCd.resetPuzzle();
            curPuzzleState = puzzleThree;
            puzzleCd.shufflePuzzle(curPuzzleState);
            puzzleCd.createImgPuzzle(puzzleThree,puzzleCd.selectImg());
            puzzleCd.resizePuzzleContainer(3);
            curDrag = puzzleCd.sortDrag(curPuzzleState);
            puzzleCd.attributeDrag(curDrag);
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
const modal = document.getElementById("modal");
const message = document.getElementById("message");

function showModal() {
    message.innerText = "Winner!";
    modal.classList.remove("hide");    
}

function hideModal() {
    modal.classList.add("hide");
}