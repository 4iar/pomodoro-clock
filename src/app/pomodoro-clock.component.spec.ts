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

  it('should initialise startingDurationMinutes.break to 5',
    inject([PomodoroClockAppComponent], (app: PomodoroClockAppComponent) => {
      expect(app.startingDurationMinutes['break']).toEqual(5);
    }));

  it('should initialise startingDurationMinutes.work to 25',
    inject([PomodoroClockAppComponent], (app: PomodoroClockAppComponent) => {
      expect(app.startingDurationMinutes['work']).toEqual(25);
    }));

  describe('Function: decrementDurationByOneMinute', () => {
    it('should decrement the duration of the relevant timer duration (work/break) by one minute',
      inject([PomodoroClockAppComponent], (app: PomodoroClockAppComponent) => {
        app.startingDurationMinutes = {
          'break': 5,
          'work': 25
        }
        app.decrementDurationByOneMinute('break');
        expect(app.startingDurationMinutes['break']).toEqual(4);
        app.decrementDurationByOneMinute('break');
        expect(app.startingDurationMinutes['break']).toEqual(3);

        app.decrementDurationByOneMinute('work');
        expect(app.startingDurationMinutes['work']).toEqual(24);
        app.decrementDurationByOneMinute('work');
        expect(app.startingDurationMinutes['work']).toEqual(23);
      }));
    it('should not allow the duration of either timer (break/work) to be less than 0',
      inject([PomodoroClockAppComponent], (app: PomodoroClockAppComponent) => {
        app.startingDurationMinutes = {
          'break': 5,
          'work': 2
        }
        app.decrementDurationByOneMinute('break');
        app.decrementDurationByOneMinute('break');
        app.decrementDurationByOneMinute('break');
        app.decrementDurationByOneMinute('break');
        app.decrementDurationByOneMinute('break');
        app.decrementDurationByOneMinute('break');
        expect(app.startingDurationMinutes['break']).toEqual(1);

        app.decrementDurationByOneMinute('work');
        app.decrementDurationByOneMinute('work');
        app.decrementDurationByOneMinute('work');
        expect(app.startingDurationMinutes['work']).toEqual(1);
      }));
    describe('Function: incrementDurationByOneMinute', () => {
      it('should increment the duration of the relevant timer duration (work/break) by one minute',
        inject([PomodoroClockAppComponent], (app: PomodoroClockAppComponent) => {
          app.startingDurationMinutes = {
            'break': 5,
            'work': 25
          }

          app.incrementDurationByOneMinute('break');
          expect(app.startingDurationMinutes['break']).toEqual(6);
          app.incrementDurationByOneMinute('break');
          expect(app.startingDurationMinutes['break']).toEqual(7);

          app.incrementDurationByOneMinute('work');
          expect(app.startingDurationMinutes['work']).toEqual(26);
          app.incrementDurationByOneMinute('work');
          expect(app.startingDurationMinutes['work']).toEqual(27);
        }));
    });
  });
});
