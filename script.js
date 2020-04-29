console.log('🍆');

// const status = {
//     currentMode: 'PAUSED', // PAUSED > RUNNING > BREAK
//     sessionLength: 25,
//     breakLength: 5,
//     startTime: null,
// };
// const getTimeRemaining = () => foo;
// const tick = foo => {
//   1. if `startTime` is null, set it to be Date.now()
//   2. get time remaining, if less than 0 switch to next mode
//   3. update UI
//   4. re-run `tick` until paused with `setTimeout(tick, 1000);`
// };
// const handleStartClick = () => {...}
// const handleStopClick = () => {...}
// const handlePauseClick = () => {...}
// const handleRestartClick = () => {...}
// const handleSessionLengthIncrement = () => {...}
// const handleSessionLengthDecrement = () => {...}
// const handleBreakLengthIncrement = () => {...}
// const handleBreakLengthDecrement = () => {...}


//          Screen Vars     //
let sessionMinutes = 25, sessionSeconds = 00, breakMinutes = 05, breakSeconds = 00;

let desiredSessionLength = document.getElementById('session').querySelector('.value');
desiredSessionLength.textContent = (sessionMinutes + ':' + sessionSeconds);


let desiredBreakLength = document.getElementById('break').querySelector('.value');
desiredBreakLength.textContent = (minutes = '05') + ':' + (seconds='00');;

let statusScreen = document.querySelector('.clock').querySelector('#status');
statusScreen.textContent = 'Session'; // default

let timeLeftScreen = document.querySelector('.clock').querySelector('#time-left');
timeLeftScreen.textContent = desiredSessionLength.textContent; // default



function updateScreenTime(screen, minutes, seconds) {
    minutes, seconds = formatTime(minutes, seconds);
    screen.textContent = minutes + ':' + seconds;
}



function formatTime(minutes, seconds=0) {
    while (seconds > 60) {
        minutes += 1;
        seconds -= 60;
    }
    minutes = (minutes > 9)? minutes : (minutes > 0)? ('0' + minutes) : '00';
    seconds = (seconds > 9)? seconds: (seconds > 0)? ('0' + seconds) : '00'

    return minutes, seconds
}

//          Buttons         //
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', whichButton);
});

function whichButton(){
    let button = this;

    if (button.classList.contains('adjust')) {
        adjust(button);
    } else if (button.classList.contains('clock')) {
        changeState(button);
    }
}

function adjust(button) {
    let value = button.parentNode.querySelector('.value');

    // format times ()

    if (button.classList.contains('up')) {
        value.textContent ++;
    } else if (button.classList.contains('down')) {
        value.textContent --;
    }
}

function changeState(button) {

}


let target = targetTime(desiredSessionLength);


function timeLeft() {
    currentTime = getCurrentTime();
    return currentTime - target;
}


function targetTime(desiredTime) {
    currentTime = getCurrentTime();
    return (currentTime + desiredTime)
}


// const startTime = new Date();
// const targetTime = new Date(startTime.getTime() + amount * 60000);
// if (targetTime > startTime) { doSomething() };


function getCurrentTime() {
    return new Date();
}


function toggleState() {

}


function getCurrentState() {

}


function onPause(){
    //pause time left
}