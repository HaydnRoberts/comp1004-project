// gather the elements
const clickerOutput = document.querySelector('#clicker-output');
const totalClickerOutput = document.querySelector('#total-clicker-output');

// set variable
var clicks = 0;
var total_clicks = 0;

// the functions
function clicked(){
    clicks += 1;
    total_clicks +=1;
    clickerOutput.innerHTML = clicks;
    totalClickerOutput.innerHTML = total_clicks;
}

function reset(){
    clicks = 0;
    total_clicks = 0;
    clickerOutput.innerHTML = clicks;
    totalClickerOutput.innerHTML = total_clicks;
}

// initial output
clickerOutput.innerHTML = clicks;
totalClickerOutput.innerHTML = total_clicks;


// shop section
var autoClicks = 0;
var bonusClicks = 0;

