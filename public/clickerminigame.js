// gather the elements
const clickerOutput = document.querySelector('#clicker-output');
const totalClickerOutput = document.querySelector('#total-clicker-output');
const bonusLevel = document.querySelector('#bonus-level');
const bonusPrice = document.querySelector('#bonus-price');
const autoLevel = document.querySelector('#auto-level');
const autoPrice = document.querySelector('#auto-price');
const loanOffer = document.querySelector('#loan-offer');
const debtAmmount = document.querySelector('#debt');

// set variable
var clicks = 0;
var total_clicks = 0;
var autoClicks = 0;
var bonusClicks = 0;
var debtValue = 0;

var tid = 0;

// the functions
function clicked(){
    clicks += 1 + bonusClicks;
    total_clicks +=1 + bonusClicks;
    clickerOutput.innerHTML = clicks;
    totalClickerOutput.innerHTML = total_clicks;
}

function reset(){
    clicks = 0;
    total_clicks = 0;
    autoClicks = 0;
    bonusClicks = 0;
    clickerOutput.innerHTML = clicks;
    totalClickerOutput.innerHTML = total_clicks;
    bonusLevel.innerHTML = bonusClicks;
    bonusPrice.innerHTML = 20 +(bonusClicks)*(bonusClicks);
    autoLevel.innerHTML = autoClicks;
    autoPrice.innerHTML = 20 +(autoClicks)*(autoClicks);
    if (tid != 0){
        clearInterval(tid)
    }
}

// initial output
clickerOutput.innerHTML = clicks;
totalClickerOutput.innerHTML = total_clicks;
bonusLevel.innerHTML = bonusClicks;
bonusPrice.innerHTML = 20 +(bonusClicks)*(bonusClicks);
autoLevel.innerHTML = autoClicks;
autoPrice.innerHTML = 20 +(autoClicks)*(autoClicks);
loanOffer.innerHTML = 50*(bonusClicks+1);
debtAmmount.innerHTML = debtValue;


// shop section

function auto(){
    if (clicks >= 20 + (autoClicks)*(autoClicks)){
        clicks -= 20 + (autoClicks)*(autoClicks);
        autoClicks += 1;
        clickerOutput.innerHTML = clicks;
        autoLevel.innerHTML = autoClicks;
        autoPrice.innerHTML = 20 +(autoClicks)*(autoClicks);
        if (tid != 0){
            clearInterval(tid)
        }
        if (debtValue == 0){
            tid = setInterval(clicked, (10000 / autoClicks));
        }
    }
}
function bonus(){
    if (clicks >=  20 +(bonusClicks)*(bonusClicks)){
        clicks -= 20 + (bonusClicks)*(bonusClicks);
        bonusClicks += 1;
        clickerOutput.innerHTML = clicks;
        bonusLevel.innerHTML = bonusClicks;
        bonusPrice.innerHTML = 20 +(bonusClicks)*(bonusClicks);
        loanOffer.innerHTML = 50*(bonusClicks+1);
    }
}

function loan(){
    clicks += 50*(bonusClicks+1);
    total_clicks += 50*(bonusClicks+1);

    // add the 20% interest to the loan
    debtValue += (50*(bonusClicks+1))+((50*(bonusClicks+1))/5);
    clearInterval(tid);
    debtAmmount.innerHTML = debtValue;
    clickerOutput.innerHTML = clicks;
    totalClickerOutput.innerHTML = total_clicks;
}
function debt(){
    if (clicks >= debtValue){
        clicks -= debtValue;
        debtValue = 0;
        if (tid != 0){
            clearInterval(tid)
        }
        if (autoClicks >= 1){
            tid = setInterval(clicked, (10000 / autoClicks));
        }
        debtAmmount.innerHTML = debtValue;
        clickerOutput.innerHTML = clicks;
    }
}