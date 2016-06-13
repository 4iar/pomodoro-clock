import { Component } from '@angular/core';
import { FormatTime } from './format-time.pipe';

@Component({
  moduleId: module.id,
  selector: 'pomodoro-clock-app',
  templateUrl: 'pomodoro-clock.component.html',
  styleUrls: ['pomodoro-clock.component.css'],
  pipes: [FormatTime]
})

export class PomodoroClockAppComponent {

  intervalTimer = 0;
  status = {'ticking': false, 'currentTimer': 'work', 'secondsRemaining': 1500, 'paused': false};
  startingDurationSeconds = {
    'break': 300,
    'work': 1500
  }

  setStatus (ticking, currentTimer, secondsRemaining) {
    this.status = {
      'ticking': ticking,
      'currentTimer': currentTimer,
      "secondsRemaining": secondsRemaining,
      'paused': false
    };
  }

  timerStart () {
    clearInterval(this.intervalTimer);  // prevent multiple timers from being created
    if (!this.status['ticking']) {
      this.setStatus(true, 'work', this.startingDurationSeconds['work']);
    }

    this.status['paused'] = false;
    this.intervalTimer = setInterval(() => this.timerTickOneSecond(), 1000);
  }

  timerPause () {
    this.status['paused'] = true;
  }

  timerReset () {
    clearInterval(this.intervalTimer);
    this.setStatus(false, 'work', this.startingDurationSeconds['work']);
  }

  timerTickOneSecond () {
    if (this.status['paused']) {
      return;
    }

    if (this.status['secondsRemaining'] === 0) {
      if (this.status['currentTimer'] === 'break') {
        // if the break has finished then reset the timer
        // so the user can start the next pomodoro
        this.timerReset();
      } else {
        // begin counting down the break since work time has ended
        this.setStatus(true, 'break', this.startingDurationSeconds['break'])
      }

      this.timerEndNotification()
      return
    };

    this.status['secondsRemaining'] -= 1;
  };

  timerEndNotification () {
    // TODO: add other notifications/options e.g. through chrome notification service
    var audio = new Audio('./alarm.mp3');
    audio.play();
  }

  decrementStartingDurationByOneMinute (timerType) {
    if (this.startingDurationSeconds[timerType] == 60) {
      return
    }
    this.startingDurationSeconds[timerType] -= 60;
  };

  incrementStartingDurationByOneMinute (timerType) {
    this.startingDurationSeconds[timerType] += 60;
  };
}
