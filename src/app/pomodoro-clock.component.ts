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
  startingDurationMinutes = {
    'break': 5,
    'work': 25
  }

  setStatus (ticking, currentTimer, minutesRemaining) {
    this.status = {
      'ticking': ticking,
      'currentTimer': currentTimer,
      'minutesRemaining': minutesRemaining
    };
  }

  timerStart () {
    this.setStatus(true, 'work', this.startingDurationMinutes['work']);
  }

  timerTogglePause () {
    this.status['ticking'] =  !this.status['ticking'];
  }

  timerReset () {
    this.setStatus(false, 'work', this.startingDurationMinutes['work']);
  }

  timerTickOneSecond () {
  };

  decrementStartingDurationByOneMinute (timerType) {
    if (this.startingDurationMinutes[timerType] == 1) {
      return
    }
    this.startingDurationMinutes[timerType] -= 1;
  };

  incrementStartingDurationByOneMinute (timerType) {
    this.startingDurationMinutes[timerType] += 1;
  };
}
