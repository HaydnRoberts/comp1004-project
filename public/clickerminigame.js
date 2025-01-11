// gather the elements
const clickerOutput = document.querySelector('#clicker-output');

// set variable
var clicks = 0;

// the functions
function clicked(){
    clicks += 1;
    clickerOutput.innerHTML = clicks;
}

function reset(){
    clicks = 0;
    clickerOutput.innerHTML = clicks;
}

// initial output
clickerOutput.innerHTML = clicks;