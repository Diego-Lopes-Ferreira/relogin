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
    this.seconds += this.incrementValue;
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
}
