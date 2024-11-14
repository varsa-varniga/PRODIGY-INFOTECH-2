const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps");
const playPauseBtn = document.getElementById("playPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 0;

function togglePlayPause() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
        
        playPauseBtn.textContent = "PAUSE";
        resetBtn.style.display = "inline";
        lapBtn.style.display = "inline";
    } else {
        clearInterval(timer);
        isRunning = false;
        playPauseBtn.textContent = "PLAY";
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    lapCount = 0; 
    display.textContent = "00:00:00:00";
    lapsContainer.innerHTML = ""; 
    resetBtn.style.display = "none";
    lapBtn.style.display = "none";
    clearAllBtn.style.display = "none"; 
    playPauseBtn.textContent = "PLAY";
}

function lap() {
    if (isRunning) {
        lapCount += 1; // Increment lap count
        const lapTime = display.textContent;
        const lapElement = document.createElement("div");
        lapElement.textContent = `#${lapCount} - ${lapTime}`;
        lapsContainer.appendChild(lapElement);
        
        clearAllBtn.style.display = "block";
    }
}

function clearAllLaps() {
    lapsContainer.innerHTML = ""; 
    lapCount = 0; // Reset lap count
    clearAllBtn.style.display = "none"; 
}

function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);
    
    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");
    milliseconds = milliseconds.toString().padStart(2, "0");
    
    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
