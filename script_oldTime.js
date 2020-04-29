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
let desiredSessionLength = document.getElementById('session').querySelector('.value');
updateScreenTime(desiredSessionLength, 25) // default

let desiredBreakLength = document.getElementById('break').querySelector('.value');
updateScreenTime(desiredBreakLength, 5); // default

let statusScreen = document.querySelector('.clock').querySelector('#status');
statusScreen.textContent = 'Session'; // default, change on toggle

let timeLeftScreen = document.querySelector('.clock').querySelector('#time-left');
timeLeftScreen.textContent = desiredSessionLength.textContent; // default



function updateScreenTime(screen, minutes, seconds=0) {
    let formatted = formatTime(minutes, seconds);
    minutes = formatted.minutes;
    seconds = formatted.seconds;
    screen.textContent = minutes + ':' + seconds;
}

function formatTime(minutes, seconds=0) {

    while (seconds > 60) {
        minutes ++;
        seconds -= 60;
        console.log(minutes, seconds);
    }
    minutes = (minutes > 9)? minutes : (minutes > 0)? ('0' + minutes) : '00';
    seconds = (seconds > 9)? seconds : (seconds > 0)? ('0' + seconds) : '00';

    return {
        minutes, 
        seconds,
    };
}



function timeLeft(target) {       // calculate this every second and update timeLeftScreen after Start
    let currentTime = getCurrentTime();
    return (currentTime - target);
}

// calculates target time ie what time in the future to count down from
function targetTime(targetTime) {  //desired time is time left, which originally is desiredSession
    let currentTime = getCurrentTime();
    let newTime = getCurrentTime();

    let addMinutes = targetTime.slice(0,2);
    let addSeconds = targetTime.slice(3,5);

    newTime.setMinutes(currentTime.getMinutes + addMinutes).setSeconds(currentTime.getSeconds + addSeconds);

    return newTime
}


// const startTime = new Date();
// const targetTime = new Date(startTime.getTime() + amount * 60000);
// if (targetTime > startTime) { doSomething() };


function getCurrentTime() {
    return new Date();
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
    } else if (button.parentNode.classList.contains('clock')) {
        let clockFunc = button.getAttribute('id');
        window[clockFunc]();
    }
}

function adjust(button) {
    let value = button.parentNode.querySelector('.value');

    // format times ()
    console.log(value.textContent[0]);

    if (button.classList.contains('up')) {
        updateScreenTime(value, (minutes++));  //FIX
    } else if (button.classList.contains('down')) {
        updateScreenTime(value, (minutes--));
    }
}

//      clock functions         //

function start() {

    let futureTarget = targetTime(timeLeftScreen.textContent); //calculated onStart, session length or timeleft
    let timeCountdown = timeLeft(futureTarget);

    console.log(timeCountdown);

    let updateSession = updateScreenTime(timeLeftScreen, 0, timeLeft);

    setInterval(updateSession, 1000);

}



function toggleState() {

}



function onPause(){
    //pause time left
}