import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'pomodoro-clock-app',
  templateUrl: 'pomodoro-clock.component.html',
  styleUrls: ['pomodoro-clock.component.css']
})
export class PomodoroClockAppComponent {
  title = 'pomodoro-clock works!';
  intervalTimer = { };
  status = { };
  startingDurationSeconds = {
    'break': 300,
    'work': 1500
  }

  setStatus (ticking, currentTimer, secondsRemaining) {
    this.status = {
      'ticking': ticking,
      'currentTimer': currentTimer,
      "secondsRemaining": secondsRemaining
    };
  }

  timerStart () {
    this.setStatus(true, 'work', this.startingDurationSeconds['work']);
  }

  timerTogglePause () {
    this.status['ticking'] =  !this.status['ticking'];
  }

  timerReset () {
    this.setStatus(false, 'work', this.startingDurationSeconds['work']);
  }

  timerTickOneSecond () {
    if (this.status['secondsRemaining'] === 0) {
      if (this.status['currentTimer'] === 'break') {
        // if the break has finished then reset the timer
        // so the user can start the next pomodoro
        this.timerReset();
      } else {
        // begin counting down the break since work time has ended
        this.setStatus(true, 'break', this.startingDurationSeconds['break'])
      }
      return
    };
    
    this.status['secondsRemaining'] -= 1;
  };

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
