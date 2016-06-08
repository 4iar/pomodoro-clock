import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { PomodoroClockAppComponent } from '../app/pomodoro-clock.component';

beforeEachProviders(() => [PomodoroClockAppComponent]);

describe('App: PomodoroClock', () => {
  it('should create the app',
      inject([PomodoroClockAppComponent], (app: PomodoroClockAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should initialise durationMinutes.break to 5',
      inject([PomodoroClockAppComponent], (app: PomodoroClockAppComponent) => {
        expect(app.durationMinutes['break']).toEqual(5);
  }));

  it('should initialise durationMinutes.work to 25',
      inject([PomodoroClockAppComponent], (app: PomodoroClockAppComponent) => {
        expect(app.durationMinutes['work']).toEqual(25);
  }));
});
