
import changeElementBackgroundImage from "./javascript/displayimg.js";

//Select id of btn
const changeImgBtn = document.querySelector('#change-tile');
const tiles = document.querySelectorAll('li');
const emptyTile = document.querySelectorAll('.empty');
let srcTile = null;


// When the page load
window.addEventListener('load', () => {
    setUpPuzzle1();
    document.getElementById("content-1").style.display = "none";
    document.getElementById("content-2").style.display = "none";
    document.getElementById("content-3").style.display = "none";
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
});

// Code for First Puzzle
const ul = document.querySelectorAll('[data-tile]');
const letters= ["A", "B", "C", "D", "E", "F", "G", "H", ""]
const state = {}
state.content = letters;

function setUpPuzzle1() {
    fillGrid(ul, letters);
    setId(ul)

    state.content = getState(ul);
    state.dimension = getDimension(state);
    // set up the droppable and dragabble contents
    setDroppable(ul);
    setDraggable(ul);

    console.log("The state content", state.content)
    console.log("The state dimension", state.dimension)
}

// ---------- Determine the State ---------- //
const getState = (items) => {
    const content = [];
    items.forEach((item, i) => {
        content.push(item.innerText)
    });
    return content;
}
// ---------- Get Empty Cell ---------- //
const getEmptyCell = () => {
    const emptyCellNumber = state.emptyCellIndex+1;
    const emptyCellRow = Math.ceil(emptyCellNumber/3);
    const emptyCellCol = 3 - (3 * emptyCellRow - emptyCellNumber);
    // emptyCellRow holds the actual row number the empty tile falls into in a 9-cell grid
    // the array index will be one less than its value. Same goes for emptyCellCol
    return [emptyCellRow-1, emptyCellCol-1]
}
// ---------- Determine the Dimension ---------- //
const getDimension = (state) => {
    let j = 0;
    let arr = [];
    const {content} = state;
    for(let i = 0; i < 3; i++) {
        arr.push(content.slice(j, j+3));
        j+=3;
    }
    return arr;
}

// ---------- Set Droppable ---------- //
const setDroppable = (items) => {
    items.forEach((item, i) => {
        if(!item.innerText) {
            state.emptyCellIndex = i;
            item.setAttribute("ondrop", "drop_handler(event);");
            item.setAttribute("ondragover", "dragover_handler(event);");
            item.setAttribute("class", "empty");
            item.setAttribute("draggable", "false");
            item.setAttribute("ondragstart", "");
            item.setAttribute("ondragend", "")
        }
        return; 
    });
}

// ---------- Remove Droppable ---------- //
const removeDroppable = (items) => {
    items.forEach((item) => {
        item.setAttribute("ondrop", "");
        item.setAttribute("ondragover", "");
        item.setAttribute("draggable", "false");
        item.setAttribute("ondragstart", "");
        item.setAttribute("ondragend", "");
    })
}
// ---------- Set Draggable ---------- //
const setDraggable = (items) => {
    const [row, col] = getEmptyCell();

    let left, right, top, bottom = null;
    if(state.dimension[row][col-1]) left = state.dimension[row][col-1];
    if(state.dimension[row][col+1]) right = state.dimension[row][col+1];

    if(state.dimension[row-1] != undefined) top = state.dimension[row-1][col];
    if(state.dimension[row+1] != undefined) bottom = state.dimension[row+1][col];

    // make its right and left dragabble
    items.forEach(item => {
        if(item.innerText == top || 
            item.innerText == bottom || 
            item.innerText == right ||
            item.innerText == left) {
                item.setAttribute("draggable", "true");
                item.setAttribute("ondragstart", "dragstart_handler(event)");
                item.setAttribute("ondragend", "dragend_handler(event)")
            }        
    });
}

// this function sets a unique id for each list item, in the form 'tile0' to 'tile8'
const setId = (items) => {
    for(let i = 0; i < items.length; i++) {
        items[i].setAttribute("id", `tile${i}`)
    }
}

const isSolvable = (arr) => {
    let number_of_inv = 0;
    // get the number of inversions
    for(let i =0; i<arr.length; i++){
        // i picks the first element
        for(let j = i+1; j < arr.length; j++) {
            // check that an element exist and index i and j, then check that element at i > at j
            if((arr[i] && arr[j]) && arr[i] > arr[j]) number_of_inv++;
        }
    }
    // if the number of inversions is even
    // the puzzle is solvable
    return (number_of_inv % 2 == 0);
}

const isCorrect = (solution, content) => {
    if(JSON.stringify(solution) == JSON.stringify(content)) return true;
    return false;
}

const fillGrid = (items, letters) => {
    let shuffled = shuffle(letters);
    // shuffle the letters array until there is a combination that is solvable
    while(!isSolvable(shuffled)) {
        shuffled = shuffle(letters);
    }

    items.forEach((item, i) => {
        item.innerText = shuffled[i];
    });
}

// shuffle the array
const shuffle = (arr) => {
    const copy = [...arr];
    // loop over half or full of the array
    for(let i = 0; i < copy.length; i++) {
        // for each index,i pick a random index j 
        let j = parseInt(Math.random()*copy.length);
        // swap elements at i and j
        let temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
    }   
    return copy;
 }


// ---------- Drag and Drop Handlers ---------- //
const dragstart_handler = ev => {
    console.log("dragstart")
    ev.dataTransfer.setData("text/plain", ev.target.id)
    ev.dataTransfer.dropEffect = "move";
}

const dragover_handler = ev => {
    console.log("dragOver");
    ev.preventDefault();
}

const drop_handler = ev => {
    console.log("drag")
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("text/plain");
    ev.target.innerText = document.getElementById(data).innerText;
    
    // once dropped, unempty the cell :)
    ev.target.classList.remove("empty")
    ev.target.setAttribute("ondrop", "");
    ev.target.setAttribute("ondragover", "");
    document.getElementById(data).innerText = "";

    // get new state
    state.content = getState(ul);
    // get new dimention from the state
    state.dimension = getDimension(state);
}

const dragend_handler = ev => {
  console.log("dragEnd");

  // remove all droppable attributes
  removeDroppable(document.querySelectorAll('[data-tile]'));

  // set new droppable and draggable attributes
  setDroppable(document.querySelectorAll('[data-tile]'));
  setDraggable(document.querySelectorAll('[data-tile]'))

    // if correct
    if(isCorrect(letters, state.content)) {
        showModal();
    }
}

// ---------- Show Modal ---------- //
const showModal = () => {
    document.getElementById('message').innerText = "Winner!";
    document.getElementById('modal').classList.remove("hide");

}
// ---------- Hide Modal ---------- //
const hideModal = () => {
    document.getElementById('modal').classList.add("hide");
}
