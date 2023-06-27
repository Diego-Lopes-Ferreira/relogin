class GenericHandler {
  constructor (id, target) {
    this.state = "off";
    this.target = target;

    this.txtHolder = document.querySelector(`#${id}-txt`);
    this.txtTimeRemaining = this.txtHolder.querySelector("[name='time-remaining']");
    this.txtTargetTime = this.txtHolder.querySelector("[name='target-time']");

    let control = document.querySelector(`#${id}`);
    this.btnPlus = control.querySelector(".plus");
    this.input = control.querySelector(".input");
    this.btnMinus = control.querySelector(".minus");
    this.btnStartStop = control.querySelector(".start-stop");
    this.btnReset = control.querySelector(".reset");

    this.btnMinus.onclick = () => this._handleMinusTarget();
    this.input.onchange = (e) => this._handleUpdateInput(e);
    this.btnPlus.onclick = () => this._handlePlusTarget();
    this.btnStartStop.onclick = () => this._handleStartStop();
    this.btnReset.onclick = () => this._handleReset();
  }
  update() { }
  _handleMinusTarget() { }
  _handlePlusTarget() { }
  _handleUpdateInput(e) { }
  _handleStartStop() {
    changeUiElementVisibility(this.txtHolder, true);
    if (this.state == "off") {
      this.state = "on";
      this.target.start();
      return;
    }
    if (this.state == "on") {
      this.state = "paused";
      this.target.pauseResume();
      return;
    }
    if (this.state == "paused") {
      this.state = "on";
      this.target.pauseResume();
      return;
    }
  }
  _handleReset() {
    changeUiElementVisibility(this.txtHolder, false);
    this.state = "off";
    this.target.end();
  }
}

class PomodoroHandler extends GenericHandler {
  constructor (id, minutes) { super(id, new Timer(minutes * 60, -1)); }

  update() {
    this.target.update();
    this.input.value = Math.floor(this.target.defaultValue / 60);
    if (this.state == "on" && this.target.running == false) {
      this.state = "off";
      changeUiElementVisibility(this.txtHolder, false);
    }
    this.txtTimeRemaining.textContent = this.target.getTimeStr();
    this.txtTargetTime.textContent = this.target.getTargetStr();
  }

  _handleMinusTarget() {
    this.target.addToDefaultValue(-60);
    this.input.value = Math.floor(this.target.defaultValue / 60);
  }
  _handlePlusTarget() {
    this.target.addToDefaultValue(60);
    this.input.value = Math.floor(this.target.defaultValue / 60);
  }
  _handleUpdateInput(e) {
    let seconds = parseInt(e.target.value);
    this.target.setDefaultValue(seconds);
  }
}

class StopWatchHandler extends GenericHandler {
  constructor (id) { super(id, new Timer(0, 1)); }

  update() {
    this.target.update();
    this.input.value = this.target.seconds;
    this.txtTimeRemaining.textContent = this.target.getTimeStr();
    this.txtTargetTime.textContent = this.target.getTargetStr();
  }
  _handleMinusTarget() {
    this.target.addToSeconds(-1);
    this.input.value = this.target.seconds;
  }
  _handlePlusTarget() {
    this.target.addToSeconds(1);
    this.input.value = this.target.seconds;
  }
  _handleUpdateInput(e) {
    let seconds = parseInt(e.target.value);
    this.target.setSeconds(seconds);
    this.input.value = this.target.seconds;
  }
  _handleStartStop() {
    changeUiElementVisibility(this.txtHolder, true);
    this.target.pauseResume();
  }
}

class CustomHandler {
  constructor (id) {
    this.txtHolder = document.querySelector(`#${id}-txt`);
    this.txtTimeRemaining = this.txtHolder.querySelector("[name='time-remaining']");
    this.txtTargetTime = this.txtHolder.querySelector("[name='target-time']");

    this.targetTime = undefined;

    this.input = document.querySelector(`input#${id}`);
    this.input.onchange = (e) => {
      let hoursMinutesStr = e.target.value;
      if (hoursMinutesStr == "") {
        this.targetTime = undefined;
        changeUiElementVisibility(this.txtHolder, false);
        return;
      }
      let hours = parseInt(hoursMinutesStr.slice(0, 2));
      let minutes = parseInt(hoursMinutesStr.slice(3, 5));
      console.log(`${hours}-${minutes}`);

      let date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(0);
      this.targetTime = date;
    };
  }

  update() {
    if (this.targetTime == undefined) return;

    let now = new Date();
    let diff = Math.floor((this.targetTime - now) / 1000);

    if (diff < 0) {
      this.targetTime = undefined;
      changeUiElementVisibility(this.txtHolder, false);
      return;
    }

    this.txtTargetTime.textContent = generateTimeStrByDate(this.targetTime, true, false);
    this.txtTimeRemaining.textContent = generateTimeStrBySeconds(diff, false, diff < 3600);
    changeUiElementVisibility(this.txtHolder, true);
  }
}
