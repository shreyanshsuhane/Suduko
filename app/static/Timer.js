// alias
const time_el = document.querySelector('#time');

// declaring variables
let seconds = 0;
let interval = null;

//update the timer
function timer() {
    seconds++;

    //format our time
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - (hrs * 3600)) / 60);
    let secs = seconds % 60;

    if (secs < 10) secs = '0' + secs;
    if (mins < 10) mins = '0' + mins;
    if (hrs < 10) hrs = '0' + hrs;
    time_el.innerHTML = `${hrs}:${mins}:${secs}`;
}

// starts timer
function start() {
    reset();
    if (interval) {
        return
    }

    interval = setInterval(timer, 1000);
}

//stops timer
function stop() {
    clearInterval(interval);
    interval = null
}

//resets timer
function reset() {
    stop();
    seconds = 0;
    time_el.innerHTML = '00:00:00';
}

// event listener
id("start-btn").addEventListener("click", start);
id("finish-btn").addEventListener("click", stop);