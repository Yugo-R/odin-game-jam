function drop(event){
    event.preventDefault();

    const data = event.dataTransfer.getData("text/plain");
    console.log(data);
}

function drag(event){
    console.log(event.target);
}