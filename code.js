const mainTextTime = document.querySelector("#time");
const pomodoro = new PomodoroHandler("pomodoro", 25);
const pause = new PomodoroHandler("pause", 5);
const stopwatch = new StopWatchHandler("stopwatch");
const custom = new CustomHandler("custom-handler");

const sidebar = document.querySelector("aside");
const btnShowHideSidebar = document.querySelector("#showhideui");
btnShowHideSidebar.onclick = () => {
  sidebar.classList.toggle("hide");
  sidebar.classList.toggle("show");
};

function update() {
  pomodoro.update();
  pause.update();
  stopwatch.update();
  custom.update();
  mainTextTime.textContent = generateTimeStrByDate();
  setTimeout(update, 1000);
}
update();
