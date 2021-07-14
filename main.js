import changeElementBackgroundImage from "./javascript/displayimg.js";

//Select id of btn
const changeImgBtn = document.querySelector('#change-tile');

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
<<<<<<< HEAD
});

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
=======
>>>>>>> 5b7911f7d32681def8fd4291cd90a36260a03552
});