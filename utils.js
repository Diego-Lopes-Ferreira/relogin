// String stuff

function generateNumberString(n) {
  if (n < 10) return "0" + n.toString();
  return n.toString();
}

function generateTimeStrBySeconds(
  seconds,
  dontShowSeconds = false,
  dontShowHours = false,
) {
  let hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  hours = generateNumberString(hours);
  minutes = generateNumberString(minutes);
  seconds = generateNumberString(seconds);
  if (dontShowHours) return `${minutes}:${seconds}`;
  if (dontShowSeconds) return `${hours}:${minutes}`;
  return `${hours}:${minutes}:${seconds}`;
}

function generateTimeStrByDate(
  date = undefined,
  dontShowSeconds = false,
  dontShowHours = false,
) {
  if (date === undefined) date = new Date();
  let hours = generateNumberString(date.getHours());
  let minutes = generateNumberString(date.getMinutes());
  let seconds = generateNumberString(date.getSeconds());
  if (dontShowHours) return `${minutes}:${seconds}`;
  if (dontShowSeconds) return `${hours}:${minutes}`;
  return `${hours}:${minutes}:${seconds}`;
}

// Time stuff

function generateDateBySeconds(seconds) {
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

// Element stuff

function changeUiElementVisibility(el, visible = undefined) {
  if (visible === undefined) {
    el.classList.toggle("show");
    el.classList.toggle("hide");
  } else if (visible === true) {
    el.classList.add("show");
    el.classList.remove("hide");
  } else if (visible === false) {
    el.classList.remove("show");
    el.classList.add("hide");
  }
}
