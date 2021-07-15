import changeElementBackgroundImage from "./javascript/displayimg.js";

//Select id of btn
const changeImgBtn = document.querySelector('#change-tile');
const tiles = document.querySelectorAll('li');
const emptyTile = document.querySelectorAll('.empty');
let srcTile = null;

// When the page load
window.addEventListener('load',()=>{
    changeElementBackgroundImage();
    document.getElementById("content-1").style.display = "none";
    document.getElementById("content-2").style.display = "none";
    document.getElementById("content-3").style.display = "none";
});

//Event listner for the button to be clicked
changeImgBtn.addEventListener('click', ()=>{
    changeElementBackgroundImage();
});

//disable the default behavior of the browser
document.addEventListener("dragover", (e)=>{
    e.preventDefault();
  });

//Event listener for tiles first puzzle
tiles.forEach(tile =>{
    tile.addEventListener("dragstart", (e)=>{
        srcTile = e.target;
        console.log('hi')
    })

    tile.addEventListener("drop", (e)=>{
        if(e.target != srcTile && e.target.classList == "empty"){
            e.target.innerHTML = srcTile.innerHTML;
            e.target.setAttribute('draggable', true);
            e.target.classList.remove("empty");

            srcTile.classList.add("empty");
            srcTile.innerHTML = "";
            srcTile.removeAttribute('draggable');
        }
    })
})

// Event listeners for puzzle visibility
const puzzle1 = document.querySelector("#puzzle1");
const puzzle2 = document.querySelector("#puzzle2");
const puzzle3 = document.querySelector("#puzzle3");

puzzle1.addEventListener('click', () => {
    document.getElementById("content-1").style.display = "block";
    document.getElementById("content-2").style.display = "none";
    document.getElementById("content-3").style.display = "none";
});

puzzle2.addEventListener('click', () => {
    document.getElementById("content-1").style.display = "none";
    document.getElementById("content-2").style.display = "block";
    document.getElementById("content-3").style.display = "none";
});

puzzle3.addEventListener('click', () => {
    document.getElementById("content-1").style.display = "none";
    document.getElementById("content-2").style.display = "none";
    document.getElementById("content-3").style.display = "block";
});