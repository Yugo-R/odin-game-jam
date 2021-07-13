/* TODO 
Create a function that will change 
the background of the tiles on function call
*/

let imageArray = [images/benjamin-suter-vXHFjQyWuMo-unsplash.jpg, images/david-becker-dMeEJRE18VI-unsplash.jpg, images/nick-fewings-y-xqEZPA6KQ-unsplash.jpg];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chooseRandomImage() {
    var randomInt = getRandomInt(0, imageArray.length);
    return imageArray[randomInt];
}

function changeElementBackgroundImage(tile) {
    var obj = document.getElementsByClassName(tile);
    var image = chooseRandomImage();
    for (var i = 0; i < obj.length; i++) {
        obj[i].style.backgroundColor = image;
    }
}
