import changeElementBackgroundImage from "./javascript/displayimg.js";

//Select id of btn
const changeImgBtn = document.querySelector('#change-tile');

// When the page load
window.addEventListener('load',()=>{
    changeElementBackgroundImage();
});

//Event listner for the button to be clicked
changeImgBtn.addEventListener('click', ()=>{
    changeElementBackgroundImage();
})
