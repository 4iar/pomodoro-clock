import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'pomodoro-clock-app',
  templateUrl: 'pomodoro-clock.component.html',
  styleUrls: ['pomodoro-clock.component.css']
})
export class PomodoroClockAppComponent {
  title = 'pomodoro-clock works!';

  startingDurationMinutes = {
    'break': 5,
    'work': 25
  }
  
  decrementDurationByOneMinute (timerType) {
    if (this.startingDurationMinutes[timerType] == 1) {
      return
    }
    this.startingDurationMinutes[timerType] -= 1;
  };

  incrementDurationByOneMinute (timerType) {
    this.startingDurationMinutes[timerType] += 1;
  };
}
