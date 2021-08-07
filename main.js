import { puzzle } from "./javascript/puzzle.js";

const nav = document.querySelector('.navbar');
const container = document.querySelector('#container');
const toggle = document.querySelector('.toggle input');

//Template array for each puzzles
const puzzlePos = ["left top","center top","right top","left center","center center","right center","left bottom","center bottom", "empty"];
//Medium Difficulty Array
const puzzlePosMedium = ["left 7% top 0%","left 37% top 0%","right 33% top 0%","right 3% top 0%",
"left 6% top 35%","left 37% top 35%","right 33% top 35%","right 2% top 35%",
"left 6% bottom 160%","left 37% bottom 160%","right 33% bottom 160%","right 2% bottom 160%",
"left 6% bottom 130%","left 37% bottom 130%", "right 33% bottom 130%","empty"];
//Hard Difficulty Array
const puzzlePosHard = ["left 3% top 4%","left 27% top 4%","left 50% top 4%","right 27% top 4%","right 3% top 4%",
"left 2% top 30%","left 27% top 30%","left 50% top 30%","right 27% top 30%","right 3% top 30%",
"left 2% top 55%","left 27% top 55%","left 50% top 55%","right 27% top 55%", "right 3% top 55%",
"left 2% bottom 144%","left 27% bottom 144%","left 50% bottom 144%","right 27% bottom 144%","right 3% bottom 144%",
"left 2% bottom 122%","left 27% bottom 122%","left 50% bottom 122%","right 27% bottom 122%","empty"];
//For modal
const gameModal = document.getElementById("gameModal-wrap");
const modal = document.getElementById("modal-wrap");
const message = document.getElementById("message");
const closeModal = document.getElementById("closeBtn");
const closeWinModal = document.getElementById("closeWinBtn");

//Track the current puzzle state
let curPuzzleState;

//Track current draggable tiles
let curDrag;

//Track current Img
let curImg;

//Track the dragged tile
let srcTile;

//Call factory function on puzzleCommand variable
let puzzleCd = puzzle();

//Track current difficulty
let curDif;

// When the page load
window.addEventListener('load',()=>{
    createPzl(3,puzzlePos);
    curDif = 'easy';
    showBtn();
});

// gridNum is the number of column to be displayed, puzzleNum is the name of the specific puzzle
function createPzl(gridNum,puzzleNum){
    //Reset Puzzle
    puzzleCd.resetPuzzle();
    //variable that will keep track of puzzle state
    curPuzzleState = [...puzzleNum];
    //shuffle puzzle(shuffle the array)
    puzzleCd.shufflePuzzle(curPuzzleState);
    //Check validity of puzzle
    puzzleCd.makeValid(curPuzzleState,puzzlePos);
    //Create puzzle
    puzzleCd.createImgPuzzle(curPuzzleState, curImg);
    //Resize container
    puzzleCd.resizePuzzleContainer(gridNum);
    //Sort draggable Tiles
    curDrag = puzzleCd.sortDrag(curPuzzleState);
    //Attribute draggable status to respective tiles
    puzzleCd.attributeDrag(curDrag, toggle.checked);
}

// Create medium difficulty puzzle based on the same rules as createPzl()
function createMedium(gridNum,puzzleNum){
    //Reset Puzzle
    puzzleCd.resetPuzzle();
    //variable that will keep track of puzzle state
    curPuzzleState = [...puzzleNum];
    //shuffle puzzle(shuffle the array)
    puzzleCd.shufflePuzzle(curPuzzleState);
    //Check validity of puzzle
    puzzleCd.makeValid(curPuzzleState,puzzlePosMedium);
    //Create puzzle
    puzzleCd.createImgPuzzle(curPuzzleState, curImg);
    //Resize container
    puzzleCd.resizePuzzleContainer(gridNum);
    //Sort draggable Tiles
    curDrag = puzzleCd.sortDrag(curPuzzleState);
    //Attribute draggable status to respective tiles
    puzzleCd.attributeDrag(curDrag, toggle.checked);
    //Create medium puzzle
    puzzleCd.mediumDiff(gridNum, puzzleNum);
}

// Create hard difficulty puzzle based on the same rules as createPzl()
function createHard(gridNum,puzzleNum){
    //Reset Puzzle
    puzzleCd.resetPuzzle();
    //variable that will keep track of puzzle state
    curPuzzleState = [...puzzleNum];
    //shuffle puzzle(shuffle the array)
    puzzleCd.shufflePuzzle(curPuzzleState);
    //Check validity of puzzle
    puzzleCd.makeValid(curPuzzleState,puzzlePosHard);
    //Create puzzle
    puzzleCd.createImgPuzzle(curPuzzleState, curImg);
    //Resize container
    puzzleCd.resizePuzzleContainer(gridNum);
    //Sort draggable Tiles
    curDrag = puzzleCd.sortDrag(curPuzzleState);
    //Attribute draggable status to respective tiles
    puzzleCd.attributeDrag(curDrag, toggle.checked);
    //Create hard puzzle
    puzzleCd.hardDiff(gridNum, puzzleNum);
}

//Event listener on navbar
nav.addEventListener("click",(e)=>{
    let target = e.target.id;
    switch(target){
        case 'puzzle1':
            createPzl(3,puzzlePos);
            curDif = 'easy';
            break;
        case 'puzzle2':
            createMedium(4, puzzlePosMedium);
            curDif = 'medium';
            break;
        case 'puzzle3':
            createHard(4, puzzlePosHard);
            curDif = 'hard';
            break;
        case 'select-image':
            gameModal.classList.remove('hide');
            break;
    }
})

//disable the default behavior of the browser when dragging
document.addEventListener("dragover", (e)=>{
    e.preventDefault();
  });

//Event listeners for toggle
toggle.addEventListener("click",()=>{
    let onoff = toggle.parentNode.querySelector('.clickOrDrag');
    let state = toggle.checked? "Click":"Drag";
    onoff.textContent = state;
    toggle.checked? puzzleCd.preventDrag(curDrag):puzzleCd.attributeDrag(curDrag, toggle.checked);
})

//Event listeners for tiles inside container
container.addEventListener("dragstart",(e)=>{
    srcTile = e.target; 
})

//Event listeners for droped tile
container.addEventListener("drop", (e)=>{
    let dropZone = e.target;
    if(dropZone.classList == "emptyImg"){
        swapTiles(dropZone, srcTile);
    }
})

container.addEventListener("click", (e)=>{
    let tile = e.target
    if(tile.style.cursor == 'pointer' && toggle.checked){
        let eTile = container.querySelector(".emptyImg");
        swapTiles(eTile, tile);
    }
})

function swapTiles(eTile, tile){
    eTile.classList.remove("emptyImg");
    eTile.style.background = `${tile.style.backgroundImage} ${tile.style.backgroundPosition} / ${tile.style.backgroundSize}`;

    tile.style.background = "none";
    tile.classList.add("emptyImg");

    curPuzzleState = puzzleCd.getPuzzleState();

    //Check if gameover
    if(puzzleCd.gameOver(curPuzzleState,puzzlePos)){
        showModal();
    }
    else{
        curDrag = puzzleCd.sortDrag(curPuzzleState);
        puzzleCd.attributeDrag(curDrag, toggle.checked);
    }
}

const start = document.getElementById("start");
const gameIntro = document.querySelector(".row.imgTxt");

start.addEventListener("click", function() {
    hideModal();
})

gameIntro.addEventListener("click", (e)=>{
    let li = e.target.innerText.toLowerCase();
    
    //Filter out huge text, if innerText catch every li
    if(li.length > 20){
        return;
    }
    else{
        curImg = puzzleCd.getImg(li)
        switch(curDif){
            case "easy":
                createPzl(3,puzzlePos);
                break;
            case "medium":
                createMedium(4,puzzlePosMedium);
                break;
            case "hard":
                createHard(4,puzzlePosHard);
                break;
        }
        
    }
})

//event listner for hide
closeModal.addEventListener("click",()=>{
    hideModal();
})
closeWinModal.addEventListener("click", ()=>{
    hideModal();
})

function showModal() {
    message.innerText = "Winner!";
    modal.classList.remove("hide");    
}

function hideModal() {
    modal.classList.add("hide");
    gameModal.classList.add("hide");
}

//Show buttons when puzzle3 is active
function showBtn() {
    prevImg.classList.remove("hideBtn");
    nextImg.classList.remove("hideBtn");
}

function hideBtn() {
    prevImg.classList.add("hideBtn");
    nextImg.classList.add("hideBtn");
}

nextImg.addEventListener("click", function () {
    curImg = puzzleCd.getNextImg(curImg);
    if(curDif == 'easy'){
        createPzl(3,puzzlePos);
    }
    else if(curDif == 'medium'){
        createMedium(4, puzzlePosMedium);
    }
    else{
        createHard(4, puzzlePosHard);
    }
});

prevImg.addEventListener("click", function () {
    curImg = puzzleCd.getPrevImg(curImg);
    if(curDif == 'easy'){
        createPzl(3,puzzlePos);
    }
    else if(curDif == 'medium'){
        createMedium(4, puzzlePosMedium);
    }
    else{
        createHard(4, puzzlePosHard);
    }
});