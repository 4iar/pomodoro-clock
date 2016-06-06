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

  it('should have as title \'pomodoro-clock works!\'',
      inject([PomodoroClockAppComponent], (app: PomodoroClockAppComponent) => {
    expect(app.title).toEqual('pomodoro-clock works!');
  }));
});
