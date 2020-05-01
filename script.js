console.log('🍆');

//          CONSTANTS           //
const getCurrentTime = () => new Date();
const leadZeros = (num) => String(num).padStart(2, '0');


//          Screen Vars     //

let status;

let sessionLength = document.getElementById('session').querySelector('.value');
let breakLength = document.getElementById('break').querySelector('.value');
let statusScreen = document.querySelector('#status');
let timeLeftScreen = document.querySelector('#time-left');


function setDefaultSettings() {
    updateScreenTime(sessionLength, 25); 
    updateScreenTime(breakLength, 5); 
    timeLeftScreen.textContent = '';
    status = 'Session';
    updateStatusScreen();
}

function updateStatusScreen() {
    statusScreen.textContent = 'Status: ' + status; // default, change on toggle
}


function updateScreenTime(screen, minutes, seconds=0) {
    formatted = formatTime(minutes, seconds);
    screen.textContent = formatted.minutes + ':' + formatted.seconds;
}


//          Time Calculations           //

function formatTime(minutes, seconds=0) {
    minutes = Math.floor(seconds/60) + minutes;
    seconds = seconds%60;

    return {
        minutes: [leadZeros(minutes)],
        seconds: [leadZeros(seconds)],
    };
}

// calculate every second and update timeLeftScreen after Start
const timeLeft = (target) => Math.round((target - getCurrentTime())/1000); //units in milliseconds


// calculates target time ie what time in the future to count down from
function targetTime(addedTime) {  
    newTime = getCurrentTime();

    addMinutes = parseInt(addedTime.slice(0,2));
    addSeconds = parseInt(addedTime.slice(3,5));

    newTime.setMinutes(newTime.getMinutes() + addMinutes);
    newTime.setSeconds(newTime.getSeconds() + addSeconds);

    return newTime
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
    } else if (button.parentNode.classList.contains('clock-main')) {
        let clockFunc = button.getAttribute('id');
        window[clockFunc]();
    }
}

function adjust(button) {
    let value = button.parentNode.querySelector('.value');
    minutes = parseInt(value.textContent.slice(0,2));
    
    if (button.classList.contains('up')) {
        minutes++;
        updateScreenTime(value, minutes);  //FIX
    } else if (button.classList.contains('down')) {
        if (minutes > 0) {
            minutes--;
            updateScreenTime(value, minutes);
        }
    }
}


//      Clock Functions         //

let futureTarget;
let timeout;

function start() {
    timeLeftScreen.textContent = (timeLeftScreen.textContent)? timeLeftScreen.textContent : (status == 'Session') ? sessionLength.textContent : breakLength.textContent;
    futureTarget = targetTime(timeLeftScreen.textContent); 

    timeout = setInterval(screenUpdateEverySecond, 1000);
}

function pause() {
    clearInterval(timeout);
}

function stop() {
    clearInterval(timeout);
    timeLeftScreen.textContent = sessionLength.textContent;
    status = 'Session';
}

function restart() {
    clearInterval(timeout);
    setDefaultSettings();
}



function screenUpdateEverySecond() {
    let timeCountdown = timeLeft(futureTarget);
    updateScreenTime(timeLeftScreen, minutes=0, seconds=timeCountdown);

    checkTimeLeft(timeCountdown);
}

function checkTimeLeft(timeCountdown) {
    if (timeCountdown < 1) {
        pause();
        toggleState();
    };
}

function toggleState() {
    clearInterval(timeout);

    timeLeftScreen.textContent = '';
    status = (status == 'Session')? 'Break' : 'Session';
    updateStatusScreen();

    start();
}


setDefaultSettings();
