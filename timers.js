class Timer {
  constructor (defaultValue, incrementValue) {
    this.defaultValue = defaultValue;
    this.incrementValue = incrementValue;
    this.seconds = defaultValue;
    this.running = false;
  }

  setSeconds(seconds) {
    this.seconds = seconds;
  }
  addToSeconds(x) {
    this.seconds += x;
    if (this.seconds < 0) this.seconds = 0;
  }
  setDefaultValue(defaultValue) {
    this.defaultValue = defaultValue;
  }
  addToDefaultValue(x) {
    this.defaultValue += x;
    if (this.defaultValue < 0) this.defaultValue = 0;
  }

  start() {
    this.seconds = this.defaultValue;
    this.running = true;
  }
  pauseResume() {
    this.running = !this.running;
  }
  end() {
    this.seconds = this.defaultValue;
    this.running = false;
  }

  update() {
    if (!this.running) return;
    this.addToSeconds(this.incrementValue);
    if (this.seconds == 0) this.end();
  }
  getTimeStr() {
    let dontShowHours = this.seconds < 3600;
    return generateTimeStrBySeconds(this.seconds, false, dontShowHours);
  }
  getTargetStr() {
    let date = new Date();
    date.setSeconds(date.getSeconds() + this.seconds);
    return generateTimeStrByDate(date, true, false);
  }
  getStartedStr() {
    let date = new Date();
    date.setSeconds(date.getSeconds() - this.seconds);
    return generateTimeStrByDate(date, true, false);
  }
}


class Timer2 {
  constructor () {
    this.time = undefined;
    this.diff = 0; // s
  }

  setTime(newTime) { this.time = newTime; }
  getTimeStr() { return generateTimeStrByDate(this.time, true, false); }
  _calcDiff(now) {
    if (this.time === undefined) return 0;
    this.diff = now - this.time;
  }
  getRemainingTimeStr() {
    let remaining = this._calcDiff(new Date()); // now
    if (remaining > 0) return false;
    remaining *= -1;
    return generateTimeStrBySeconds(remaining, false, remaining < 3600);
  }
  getPassedTimeStr() {
    this._calcDiff(new Date()); // now
    return generateTimeStrBySeconds(this.diff, false, this.diff < 3600);
  }
}
