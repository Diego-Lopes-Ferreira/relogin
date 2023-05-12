function formatNumber(n) {
  if (n < 10) return "0" + n.toString();
  return n.toString();
};

function setupButtonWithTarget(btn, target, plusTime) {
  btn.onclick = () => {
    if (target.isThereTarget()) {
      let targetTime = new Date();
      targetTime.setMinutes(targetTime.getMinutes() + plusTime);
      target.setNewTarget(targetTime);
    } else {
      target.clearTarget();
    }
  };
}

function formatTimeByDate(
  date = undefined,
  dontShowMinutes = false,
  dontShowHours = false,
) {
  if (date === undefined) date = new Date();
  let hours = formatNumber(date.getHours());
  let minutes = formatNumber(date.getMinutes());
  let seconds = formatNumber(date.getSeconds());
  if (dontShowHours) return `${minutes}:${seconds}`;
  if (dontShowMinutes) return `${hours}:${minutes}`;
  return `${hours}:${minutes}:${seconds}`;
}

class TargetTimeStructure {
  constructor (name) {
    this.targetTime = undefined;
    this.name = name;
    this.container = document.querySelector(`#${name}`);
    this.txtTimeRemaining = this.container.querySelector(`[name=time-remaining]`);
    this.txtTargetTime = this.container.querySelector(`[name=target-time]`);
  }
  _changeClasses(show = undefined) {
    if (show == true) {
      this.container.classList.add("show");
      this.container.classList.remove("hide");
      return;
    } else if (show == false) {
      this.container.classList.remove("show");
      this.container.classList.add("hide");
      return;
    }
    this.container.classList.toggle("show");
    this.container.classList.toggle("hide");
  }
  _genDateBySeconds(seconds) {
    let hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    let date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date;
  }
  update() {
    if (this.targetTime === undefined) return;
    let now = new Date();
    let diff = Math.floor((this.targetTime - now) / 1000);
    if (diff < 0) this.clearTarget();
    let date = this._genDateBySeconds(diff);
    let dontShowHours = diff < 3600;
    this.txtTimeRemaining.textContent = formatTimeByDate(date, false, dontShowHours);
  }
  setNewTarget(newTarget) {
    this.targetTime = newTarget;
    this.txtTargetTime.textContent = formatTimeByDate(newTarget, true);
    this._changeClasses(true);
    this.update();
  }
  setNewTargetMS(ms) {
    let targetTime = new Date();
    targetTime.setHours(parseInt(ms.slice(0, 2)));
    targetTime.setMinutes(parseInt(ms.slice(3)));
    targetTime.setSeconds(0);
    this.setNewTarget(targetTime);
  }
  clearTarget() {
    this.targetTime = undefined;
    this._changeClasses();
  }
  isThereTarget() {
    return this.targetTime === undefined;
  }
}

const mainTextTime = document.querySelector("#time");
const btnSetPomodoro25 = document.querySelector("#btnSetPomodoro25");
const targetPomodoro25 = new TargetTimeStructure("pomodoro25");
const btnSetPomodoro05 = document.querySelector("#btnSetPomodoro05");
const targetPomodoro05 = new TargetTimeStructure("pomodoro05");
const inputCustom = document.querySelector("header #targetTime");
const targetCustom = new TargetTimeStructure("targetCustom");
const btnToggleUiVisibility = document.querySelector("#showhideui");

setupButtonWithTarget(btnSetPomodoro25, targetPomodoro25, 25);
setupButtonWithTarget(btnSetPomodoro05, targetPomodoro05, 5);
inputCustom.addEventListener("input", () => {
  if (inputCustom.value == "") {
    targetCustom.clearTarget();
  } else {
    targetCustom.setNewTargetMS(inputCustom.value);
  }
});

btnToggleUiVisibility.onclick = () => {
  document.querySelector(".ui").classList.toggle("hide");
  document.querySelector(".ui").classList.toggle("show");
  btnToggleUiVisibility.textContent = btnToggleUiVisibility.textContent == "show" ? "hide" : "show"
}

function update() {
  targetPomodoro25.update();
  targetPomodoro05.update();
  targetCustom.update();
  mainTextTime.textContent = formatTimeByDate();
  setTimeout(update, 1000);
}
update();
