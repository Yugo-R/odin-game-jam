import changeElementBackgroundImage from "./javascript/displayimg.js";
import { puzzle } from "./javascript/puzzle.js";

const nav = document.querySelector('.navbar');
const container = document.querySelector('#container');

//Template array for each puzzles
// let puzzleOne = ["a","b","c","d","e","f","g","h","empty"];
// let puzzleTwo = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,"empty"];
let puzzlePos = ["left top","center top","right top","left center","center center","right center","left bottom","center bottom", "empty"];
//Medium Difficulty Array
let puzzlePosMedium = ["left 7% top 0%","left 37% top 0%","right 33% top 0%","right 3% top 0%",
"left 6% top 35%","left 37% top 35%","right 33% top 35%","right 2% top 35%",
"left 6% bottom 160%","left 37% bottom 160%","right 33% bottom 160%","right 2% bottom 160%",
"left 6% bottom 130%","left 37% bottom 130%", "right 33% bottom 130%","empty"];
//Hard Difficulty Array
let puzzlePosHard = ["left 3% top 4%","left 27% top 4%","left 50% top 4%","right 27% top 4%","right 3% top 4%",
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

// When the page load
window.addEventListener('load',()=>{
    createPzl(3,puzzlePos);
    showBtn();
    // gameModal.classList.add('hide');
    // hideBtn();
    // showModal();
});

//Event listener on the navbar OBSOLETE
// nav.addEventListener('click',(e)=>{
//     let btnId = e.target.id;
//     switch(btnId){
//         case "puzzle1":
//             createPzl(3,puzzleOne);
//             hideBtn();
//             break;
//         case "puzzle2":
//             createPzl(4,puzzleTwo);
//             hideBtn();
//             break;
//         case "puzzle3":
//             createPzl(3,puzzleThree);
//             showBtn();
//             break;
//     }
// })

// gridNum is the number of column to be displayed, puzzleNum is the name of the specific puzzle
function createPzl(gridNum,puzzleNum){
    //Reset Puzzle
    puzzleCd.resetPuzzle();
    //variable that will keep track of puzzle state
    curPuzzleState = [...puzzleNum];
    //shuffle puzzle(shuffle the array)
    puzzleCd.shufflePuzzle(curPuzzleState);
    //Create puzzle
    puzzleCd.createImgPuzzle(curPuzzleState, curImg);
    //Resize container
    puzzleCd.resizePuzzleContainer(gridNum);
    //Sort draggable Tiles
    curDrag = puzzleCd.sortDrag(curPuzzleState);
    //Attribute draggable status to respective tiles
    puzzleCd.attributeDrag(curDrag);
}

// Create medium difficulty puzzle based on the same rules as createPzl()
function createMedium(gridNum,puzzleNum){
    //Reset Puzzle
    puzzleCd.resetPuzzle();
    //variable that will keep track of puzzle state
    curPuzzleState = [...puzzleNum];
    //shuffle puzzle(shuffle the array)
    puzzleCd.shufflePuzzle(curPuzzleState);
    //Create puzzle
    puzzleCd.createImgPuzzle(curPuzzleState, curImg);
    //Resize container
    puzzleCd.resizePuzzleContainer(gridNum);
    //Sort draggable Tiles
    curDrag = puzzleCd.sortDrag(curPuzzleState);
    //Attribute draggable status to respective tiles
    puzzleCd.attributeDrag(curDrag);
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
    //Create puzzle
    puzzleCd.createImgPuzzle(curPuzzleState, curImg);
    //Resize container
    puzzleCd.resizePuzzleContainer(gridNum);
    //Sort draggable Tiles
    curDrag = puzzleCd.sortDrag(curPuzzleState);
    //Attribute draggable status to respective tiles
    puzzleCd.attributeDrag(curDrag);
    //Create hard puzzle
    puzzleCd.hardDiff(gridNum, puzzleNum);
}

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
    if(dropZone.classList == "emptyImg"){
        dropZone.classList.remove("emptyImg");
        dropZone.style.background = `${srcTile.style.backgroundImage} ${srcTile.style.backgroundPosition} / ${srcTile.style.backgroundSize}`;

        srcTile.style.background = "none";
        srcTile.classList.add("emptyImg");

        curPuzzleState = puzzleCd.getPuzzleState();

        //Check if gameover
        if(puzzleCd.gameOver(curPuzzleState,puzzlePos)){
            showModal();
        }
        else{
            curDrag = puzzleCd.sortDrag(curPuzzleState);
            puzzleCd.attributeDrag(curDrag);
        }
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
        createPzl(3,puzzlePos);
    }
})
// Make intro buttons generate puzzle imgs
// const firstImg = document.getElementById("displayImg1");
// const secondImg = document.getElementById("displayImg2");
// const thirdImg = document.getElementById("displayImg3");
// const fourthImg = document.getElementById("displayImg4");
// const fifthImg = document.getElementById("displayImg5");
// const sixthImg = document.getElementById("displayImg6");
// const seventhImg = document.getElementById("displayImg7");
// const eighthImg = document.getElementById("displayImg8");
// const ninthImg = document.getElementById("displayImg9");
// const tenthImg = document.getElementById("displayImg10");

// firstImg.addEventListener("click", function () {
//     curImg = puzzleCd.getEpcot(curImg);
//     createPzl(3,puzzlePos);
//     console.log("First Image");
// })

// secondImg.addEventListener("click", function () {
//     curImg = puzzleCd.getBuilding(curImg);
//     createPzl(3,puzzlePos);
//     console.log("Second Image");
// })

// thirdImg.addEventListener("click", function () {
//     curImg = puzzleCd.getStairs(curImg);
//     createPzl(3,puzzlePos);
//     console.log("Third Image");
// })

// fourthImg.addEventListener("click", function () {
//     curImg = puzzleCd.getPoseidon(curImg);
//     createPzl(3,puzzlePos);
//     console.log("Fourth Image");
// })

// fifthImg.addEventListener("click", function () {
//     curImg = puzzleCd.getComic(curImg);
//     createPzl(3,puzzlePos);
//     console.log("Fifth Image");
// })

// sixthImg.addEventListener("click", function () {
//     curImg = puzzleCd.getJellyfish(curImg);
//     createPzl(3,puzzlePos);
//     console.log("Sixth Image");
// })

// seventhImg.addEventListener("click", function () {
//     curImg = puzzleCd.getSnake(curImg);
//     createPzl(3,puzzlePos);
//     console.log("Seventh Image");
// })

// eighthImg.addEventListener("click", function () {
//     curImg = puzzleCd.getStreet(curImg);
//     createPzl(3,puzzlePos);
//     console.log("Eighth Image");
// })

// ninthImg.addEventListener("click", function () {
//     curImg = puzzleCd.getTemple(curImg);
//     createPzl(3,puzzlePos);
//     console.log("Ninth Image");
// })

// tenthImg.addEventListener("click", function () {
//     curImg = puzzleCd.getIndonesia(curImg);
//     createPzl(3,puzzlePos);
//     console.log("Tenth Image");
// })

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

//Event listener on the gameModal
//gameModal.addEventListener('click', () =>{
    //createPzl();
//})


//For changeImg Buttons
// const prevImg = document.getElementById("prevImg");
// const nextImg = document.getElementById("nextImg");
// const imageArray = ["../images/brian-mcgowan-NAJa5rRgwDE-unsplash.jpg", 
// "../images/david-becker-dMeEJRE18VI-unsplash.jpg", 
// "../images/nick-fewings-y-xqEZPA6KQ-unsplash.jpg", 
// "../images/daniels-joffe-wWTow3BNoCs-unsplash.jpg", 
// "../images/erik-mclean-OQgpRHFJwbQ-unsplash.jpg", 
// "../images/sasha-stories-r5sWUXSgEfg-unsplash.jpg", 
// "../images/brandon-nelson-2smDZopBMso-unsplash.jpg", 
// "../images/luis-mejicanos-aaqBs1zDeyA-unsplash.jpg", 
// "../images/reno-laithienne-CwJP_8mKvTo-unsplash.jpg"];

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
// let li = document.getElementById('container').getElementsByTagName('li');
// console.log (li);

nextImg.addEventListener("click", function () {
    curImg = puzzleCd.getNextImg(curImg);
    createPzl(3,puzzlePos);
});

prevImg.addEventListener("click", function () {
    curImg = puzzleCd.getPrevImg(curImg);
    createPzl(3,puzzlePos);
});

const easy = document.getElementById("puzzle1");
const medium = document.getElementById("puzzle2");
const hard = document.getElementById("puzzle3");
easy.addEventListener("click", function() {
    createPzl(3,puzzlePos);
})
medium.addEventListener("click", function() {
    createMedium(4, puzzlePosMedium);
})
hard.addEventListener("click", function() {
    createHard(4, puzzlePosHard);
})