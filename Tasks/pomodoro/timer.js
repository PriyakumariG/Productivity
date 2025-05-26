const mindiv = document.querySelector(".mins");
const secdiv = document.querySelector(".secs");
const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset");
const alarm = document.getElementById("alarm");

let totalSeconds = 0;
let currentSeconds = 0;
let interval = null;
let paused = false;

function updateDisplay(secs) {
  const mins = Math.floor(secs / 60);
  const remSecs = secs % 60;
  mindiv.textContent = mins;
  secdiv.textContent = remSecs < 10 ? "0" + remSecs : remSecs;
}

function startTimer(minutes) {
  totalSeconds = minutes * 60;
  currentSeconds = totalSeconds;
  updateDisplay(currentSeconds);
  setProgress(0);

  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    if (!paused && currentSeconds > 0) {
      currentSeconds--;
      updateDisplay(currentSeconds);
      const progress = ((totalSeconds - currentSeconds) / totalSeconds) * 100;
      setProgress(progress);
    } else if (currentSeconds <= 0) {
      clearInterval(interval);
      alarm.play();
      switchMode();
    }
  }, 1000);
}

function switchMode() {
  const current = localStorage.getItem("mode") || "focus";
  const nextMode = current === "focus" ? "break" : "focus";
  localStorage.setItem("mode", nextMode);

  startBtn.textContent = nextMode === "focus" ? "Start Focus" : "Start Break";
  startBtn.style.display = "inline-block";
}

startBtn.addEventListener("click", () => {
  const mode = localStorage.getItem("mode") || "focus";
  const mins = parseInt(localStorage.getItem(mode + "Time")) || 1;
  paused = false;
  startBtn.style.display = "none";
  startTimer(mins);
});

pauseBtn.addEventListener("click", () => {
  if (!interval) return;
  paused = !paused;
  pauseBtn.textContent = paused ? "Resume" : "Pause";
});

resetBtn.addEventListener("click", () => {
  if (interval) clearInterval(interval);
  paused = false;
  updateDisplay(0);
  setProgress(0);
  startBtn.style.display = "inline-block";
  pauseBtn.textContent = "Pause";
});
