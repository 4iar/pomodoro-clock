import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'pomodoro-clock-app',
  templateUrl: 'pomodoro-clock.component.html',
  styleUrls: ['pomodoro-clock.component.css']
})
export class PomodoroClockAppComponent {
  title = 'pomodoro-clock works!';

  durationMinutes = {
    'break': 5,
    'work': 25
  }
  
  decrementDurationByOneMinute (timerType) {
    if (this.durationMinutes[timerType] == 1) {
      return
    }
    this.durationMinutes[timerType] -= 1;
  };

  incrementDurationByOneMinute (timerType) {
    this.durationMinutes[timerType] += 1;
  };
}
