import changeElementBackgroundImage from "./javascript/displayimg.js";

//Select id of btn
const changeImgBtn = document.querySelector('#change-tile');
const tiles = document.querySelectorAll('li');
const emptyTile = document.querySelectorAll('.empty');
let srcTile = null;

// When the page load
window.addEventListener('load',()=>{
    changeElementBackgroundImage();
});

//Event listner for the button to be clicked
changeImgBtn.addEventListener('click', ()=>{
    changeElementBackgroundImage();
});

//disable the default behavior of the browser
document.addEventListener("dragover", (e)=>{
    e.preventDefault();
  });

//Event listener for all li
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