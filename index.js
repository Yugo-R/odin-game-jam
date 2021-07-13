/* TODO 
Create a function that will change 
the background of the tiles on function call
*/
const imageArray = ["images/benjamin-suter-vXHFjQyWuMo-unsplash.jpg", "images/david-becker-dMeEJRE18VI-unsplash.jpg", "images/nick-fewings-y-xqEZPA6KQ-unsplash.jpg", "images/daniels-joffe-wWTow3BNoCs-unsplash.jpg"];
const imgPos = ["left top","center top","right top","left center","center center","right center","left bottom","center bottom"]
const tiles = document.querySelectorAll('[data-tile]');

let changeImgBtn = document.querySelector('#change-tile');

// When the page load
window.addEventListener('load',()=>{
    changeElementBackgroundImage();
});

//Event listner for the button to be clicked
changeImgBtn.addEventListener('click', ()=>{
    changeElementBackgroundImage();
})

//Added this new function that will get the next img in the array.
// I added this for easier understanding of what is going on, can be replaced with the GetRandomInt()
function getNextImg(currentImg){
    let imgIndex = imageArray.indexOf(currentImg)
    if(imgIndex == imageArray.length - 1){
        return imageArray[0];
    }
    else{
        return imageArray[imgIndex + 1];
    }
}
function getRandomInt() {
    return Math.floor(Math.random()*imageArray.length);
}

function chooseRandomImage() {
    var randomInt = getRandomInt();
    return imageArray[randomInt];
}

function changeElementBackgroundImage() {
    // This is a ternary operator(the same things as an if else loop). It will check if a backgound image doesn't exist, if it doesn't exist it will parse the last item of the imageArray to get the first imageArray item. Else it will parse the current backgound img and it will return the next img. 
    let image = !tiles[0].style.backgroundImage ? getNextImg(imageArray[imageArray.length - 1]) : getNextImg(tiles[0].style.backgroundImage.split("\"")[1]);
    
    for(let i=0; i < tiles.length; i++){
        tiles[i].style.backgroundImage = `url(${image})`;
        tiles[i].style.backgroundPosition = imgPos[i];
        tiles[i].style.objectFit = "cover";
    }
}
