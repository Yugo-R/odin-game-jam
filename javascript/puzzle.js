export let puzzle = ()=>{
    const container = document.querySelector('#container');
    const imageArray = ["../images/brian-mcgowan-NAJa5rRgwDE-unsplash.jpg", "../images/david-becker-dMeEJRE18VI-unsplash.jpg", "../images/nick-fewings-y-xqEZPA6KQ-unsplash.jpg", "../images/daniels-joffe-wWTow3BNoCs-unsplash.jpg", "../images/erik-mclean-OQgpRHFJwbQ-unsplash.jpg", "../images/sasha-stories-r5sWUXSgEfg-unsplash.jpg", "../images/brandon-nelson-2smDZopBMso-unsplash.jpg", "../images/luis-mejicanos-aaqBs1zDeyA-unsplash.jpg", "../images/reno-laithienne-CwJP_8mKvTo-unsplash.jpg", "../images/filippo-cesarini-BS0wAXTkEPY-unsplash.jpg"];
    return {
        //NEED REVISING
        createPuzzle: (puzzle)=>{
            for(let i=0; i < puzzle.length; i++){
                if(puzzle[i] == "empty"){
                    let empty = document.createElement('li');
                    empty.classList.add("empty");
                    container.appendChild(empty);
                }
                else{
                    let li = document.createElement('li');
                    li.innerHTML = puzzle[i];
                    container.appendChild(li);
                }
            }
        },
        //NEED REVISING
        createImgPuzzle:(puzzle, img)=>{
            if(!img){
                img = imageArray[0];
            }
            for(let i=0; i<puzzle.length; i++){
                if(puzzle[i] == "empty"){
                    let empty = document.createElement('li');
                    empty.classList.add("emptyImg");
                    container.appendChild(empty);
                }
                else{
                    let li = document.createElement('li');
                    li.style.background = `url(${img})`;
                    li.style.backgroundPosition = puzzle[i];
                    li.style.backgroundSize = "500px 500px";
                    container.appendChild(li);
                }
            }
        },
        shufflePuzzle:(puzzle)=>{
            //Fisher Yates algorithm to shuffle array
            for (let i = puzzle.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = puzzle[i];
                puzzle[i] = puzzle[j];
                puzzle[j] = temp;
              }
        },
        resetPuzzle: ()=>{
            while(container.firstChild){
                container.removeChild(container.firstChild);
            };
        },
        //NEED REVISING
        resizePuzzleContainer:(col)=>{
            let baseCol = 3;
            let newCol = Math.abs(baseCol - col);
            let tiles = container.querySelectorAll('li');

            if(newCol == 0){
                container.style.height = '500px';
                container.style.width = '500px';

                tiles.forEach(tile =>{
                    tile.style.height = "32%";
                    tile.style.width = "32%";
                })
            }
            else{
                let newSize = 500 + (150*newCol);
                let newTileSize = ((newSize/col)/newSize)*100;
                container.style.height = `${newSize}px`;
                container.style.width = `${newSize}px`;
                tiles.forEach(tile =>{
                    tile.style.height = `${newTileSize - 2}%`
                    tile.style.width = `${newTileSize - 2}%`;
                })
            }
        },
        //Return an array of draggable positions
        //NEED REVISE
        sortDrag:(tiles)=>{
            let colLength = tiles.length == 9? 3:4;
            //Two pointers x and y that check edges
            let x = 0;
            let y = colLength-1;

            for(let i =0; i < tiles.length; i++){
                if(i == y+1){
                    x += colLength;
                    y += colLength;
                }
                if(tiles[i] == "empty"){
                    //If it's a x edge (left edge of container)
                    if(i == x){
                        return [i-colLength,i+1,i+colLength].filter(n => n >= 0 && n < tiles.length);
                    }
                    //If it's a y edge(right edge of container)
                    else if(i == y){
                        return [i-colLength,i-1, i+colLength].filter(n => n >= 0 && n < tiles.length);
                    }
                    else{
                        return [i-colLength, i-1, i+1, i+colLength].filter(n => n >= 0 && n < tiles.length);
                    }
                }
            }
        },
        attributeDrag:(tilesPos)=>{
            let tiles = container.querySelectorAll('li');
            
            //reset draggable tiles
            tiles.forEach(tile =>{
                tile.removeAttribute("draggable");
            })
            
            for(let j =0; j < tilesPos.length; j++){
            //    tiles[tilesPos[j]].style.backgroundColor = "red";
               tiles[tilesPos[j]].setAttribute("draggable", true);
            }
        },
        getPuzzleState:()=>{
           let li = container.querySelectorAll('li');
           let arr = [];
           for(let i=0; i<li.length;i++){
               if(li[i].classList == "empty" || li[i].classList == "emptyImg"){
                   arr.push("empty");
               }
               else{
                   !li[i].style.backgroundPosition? arr.push(li[i].innerHTML):arr.push(li[i].style.backgroundPosition);
               }
           }
           return arr;
        },
        gameOver:(curArray, templArray)=>{
            for(let i =0; i < curArray.length; i++){
                if(curArray[i] != templArray[i]){
                    return false;
                }
            }
            return true
        },
        getNextImg:(currentImg)=>{
            let imgIndex = imageArray.indexOf(currentImg)
            if(imgIndex == -1 || imgIndex == imageArray.length - 1){
                return imageArray[0];
            }
            else{
                return imageArray[imgIndex + 1];
            }
        },
        getPrevImg:(currentImg)=>{
            let imgIndex = imageArray.indexOf(currentImg)
            if(imgIndex == -1 || imgIndex == 0){
                return imageArray[imageArray.length - 1];
            }
            else{
                return imageArray[imgIndex - 1];
            }
        },
        getEpcot:()=>{
            return imageArray[0];
        },
        getBuilding:()=>{
            return imageArray[1];
        },
        getStairs:()=>{
            return imageArray[2];
        },
        getPoseidon:()=>{
            return imageArray[3];
        },
        getComic:()=>{
            return imageArray[4];
        },
        getJellyfish:()=>{
            return imageArray[5];
        },
        getSnake:()=>{
            return imageArray[6];
        },
        getStreet:()=>{
            return imageArray[7];
        },
        getTemple:()=>{
            return imageArray[8];
        },
        getIndonesia:()=>{
            return imageArray[9];
        },
        //Get 4x4 puzzle
        //NEED REVISE
        mediumDiff:(col)=>{
            let baseCol = 4;
            let newCol = Math.abs(baseCol - col);
            let tiles = container.querySelectorAll('li');

            if(newCol == 0){
                container.style.height = '650px';
                container.style.width = '650px';

                tiles.forEach(tile =>{
                    tile.style.height = "23%";
                    tile.style.width = "23%";
                    tile.style.backgroundSize = "650px 650px";
                });
            }
            else{
                let newSize = 500 + (150*newCol);
                let newTileSize = ((newSize/baseCol)/newSize)*100;
                container.style.height = `${newSize}px`;
                container.style.width = `${newSize}px`;
                tiles.forEach(tile =>{
                    tile.style.height = `${newTileSize - 2}%`
                    tile.style.width = `${newTileSize - 2}%`;
                })
            }
        },
        //Get 5x5 puzzle
        //NEED REVISE
        hardDiff:(col)=>{
            let baseCol = 5;
            let newCol = Math.abs(baseCol - col);
            let tiles = container.querySelectorAll('li');

            if(newCol == 0){
                container.style.height = '650px';
                container.style.width = '650px';

                tiles.forEach(tile =>{
                    tile.style.height = "23%";
                    tile.style.width = "23%";
                    tile.style.backgroundSize = "650px 650px";
                })
            }
            else{
                let newSize = 500 + (150*newCol);
                let newTileSize = ((newSize/baseCol)/newSize)*100;
                container.style.height = `${newSize}px`;
                container.style.width = `${newSize}px`;
                tiles.forEach(tile =>{
                    tile.style.height = `${newTileSize - 2}%`
                    tile.style.width = `${newTileSize - 2}%`;
                    tile.style.backgroundSize = "650px 650px";
                })
            }
        }
    }

}